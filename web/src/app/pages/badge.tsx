import styled from "styled-components";
import {NextPage} from "next";

const Badge = styled.span`
  padding: 8px 16px;
    font-weight: bold;
    text-align: center;
    color: white;
    background: red;
    border-radius: 16px;
`

const Page: NextPage = () => {
  return <Badge>Hello World!</Badge>
}

export default Page