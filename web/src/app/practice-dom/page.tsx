'use client'
import React from "react";
import DisplayStringOfReact from "@/app/practice-dom/component/practice1-create-react-element";
import Message from "@/app/practice-dom/component/practice2-create-component";
import Parent from "@/app/practice-dom/component/practice3-create-parent-and-child-component";
import Page from "@/app/practice-dom/component/practice4-create-context";
import Counter from "@/app/practice-dom/component/practice5-use-state";
import {Clock} from "@/app/practice-dom/component/practice6-use-effect";
import Counter2 from "@/app/practice-dom/component/practice8-use-state2";
import Counter3 from "@/app/practice-dom/component/practice9-use-reducer";
import {Parent2} from "@/app/practice-dom/component/practice10-use-callback";

const TestDisplay = () => {
  return (
    <div>
      <DisplayStringOfReact/>
      <Message/>
      <Parent/>
      <Page/>
      <Counter initialValue={0} dummy={"TEST"}/>
      <Clock/>
      {/*<Counter2/>*/}
      {/*<Counter3 initialValue1={100} initialValue2={1000}/>*/}
      <Parent2/>
    </div>
  )
}

export default TestDisplay


