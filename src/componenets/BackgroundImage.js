import React from 'react'
import styled from 'styled-components'

const BackgroundImage = () => {
  return (
   <BackgroundContainer>
    <img src='https://hips.hearstapps.com/hmg-prod/images/best-spring-movies-1677000068.jpg?resize=1200:*'
    alt='no internet connection'
    />
   </BackgroundContainer>
  )
}

const BackgroundContainer = styled.div`
       height: 100vh;
       width: 100vw;
       img{
        height: 100vh;
        width: 100vw;
       }
`

export default BackgroundImage