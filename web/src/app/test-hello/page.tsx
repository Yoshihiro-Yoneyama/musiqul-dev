'use client';
import Hello from "@/app/test-hello/hello";
import React from "react";
import LogTypedString from "@/app/test-hello/test-log";
import Message from "@/app/test-hello/components/message";
import Parent from "@/app/test-hello/components/container-sample";
import HeaderContent from "@/app/test-hello/components/comtext-sample";
import Counter from "@/app/test-hello/components/counter-sample";
import Counter2 from "@/app/test-hello/components/counter-sample2";
import Parent2 from "@/app/test-hello/components/use-memo-sample";

const name: String = "Next";

const TestHello = () => {
  return (
    <div>
      <Hello/>
      <p>{name}</p>
      <LogTypedString/>
      <Message/>
      <Parent/>
      <HeaderContent/>
      <Counter initialValue={0}/>
      <Counter2 initialValue={0}/>
      <Parent2 />
    </div>
  );
}

export default TestHello;