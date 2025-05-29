import React from 'react'
import ComingSoon from './ComingSoon'

export default function LearnPage() {
    const options = {
        title: "Learning Paths",
        objectives: ["Crafted Curriculum","Beginner Friendly","Immersive Solving Topics"]
    }
  return (
    <>
        <ComingSoon feature={options}/>
    </>
  )
}
