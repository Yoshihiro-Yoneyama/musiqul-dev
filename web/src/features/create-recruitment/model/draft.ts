import { useSyncExternalStore } from "react";
import type { NewRecruitment } from "@/entities/recruitment";

/**
 * 入力画面と確認画面の間で受け渡す下書き。
 * 確認画面で再読み込みしても消えないように sessionStorage に保存する（タブを閉じると消える）。
 */
const STORAGE_KEY = "musiqul:create-recruitment:draft";

type StoredDraft = Omit<NewRecruitment, "deadline"> & { deadline: string };

const listeners = new Set<() => void>();
let cache: { raw: string | null; draft: NewRecruitment | null } = { raw: null, draft: null };

function readRaw(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getSnapshot(): NewRecruitment | null {
  const raw = readRaw();
  if (raw !== cache.raw) {
    cache = { raw, draft: parse(raw) };
  }
  return cache.draft;
}

function parse(raw: string | null): NewRecruitment | null {
  if (raw === null) return null;
  try {
    const stored = JSON.parse(raw) as StoredDraft;
    return { ...stored, deadline: new Date(stored.deadline) };
  } catch {
    return null;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function saveDraft(draft: NewRecruitment): void {
  const stored: StoredDraft = { ...draft, deadline: draft.deadline.toISOString() };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // 保存できない環境（プライベートモードなど）では、確認画面で「入力内容がありません」と表示される
  }
  notify();
}

export function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // 何もしない
  }
  notify();
}

/** 下書きを読む。サーバー描画時と、まだ読み込んでいない間は undefined */
export function useDraft(): NewRecruitment | null | undefined {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}
