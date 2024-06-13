'use client';
import Hello from "@/app/test-hello/hello";
import React from "react";
import LogTypedString from "@/app/test-hello/test-log";
import Message from "@/app/test-hello/components/message";
import Parent from "@/app/test-hello/components/container-sample";

const name: String = "Next";

const TestHello = () => {
  return (
    <div>
      <Hello/>
      <p>{name}</p>
      <LogTypedString/>
      <Message/>
      <Parent/>
    </div>
  );
}

export default TestHello;