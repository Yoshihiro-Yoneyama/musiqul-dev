import axios from "axios";

type Recruitment = {
  name: string,
  owner: string,
  // genres: string[],
  // songTitle: string,
  // artist: string,
  // ownerInstruments: string[],
  // recruitedInstruments: string[],
  // requiredGenerations: string[],
  // requiredGender: string,
  // deadline: Date
}

const createRecruitment = () => {
  axios.post(
    `/recruitment`,
    
  )
}