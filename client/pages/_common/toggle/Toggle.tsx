/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

// const ToggleWrapper = styled.div<any>`
//     width: 50px;
//     min-width: 50px;
//     height: 25px;
//     border-radius: 25px;
//     border: 1px solid #666;
//     margin: auto;
//     display: flex;
//     position: absolute;
//     left: 2vw;
//     top: 3vh;
//     background-image: linear-gradient(to bottom, ${p => p.theme.colors.primaryColor}, ${p => p.theme.colors.secondaryColor});

//     @media(min-width: 768px){
//         width: 50px;
//         min-width: 50px;
//         height: 25px;
//         border-radius: 25px;
//         border: 1px solid #666;
//         margin: auto;
//         display: flex;
//         position: absolute;
//         margin-left: 90vw;
//         top: 3vh;
//         background-image: linear-gradient(to bottom, ${p => p.theme.colors.primaryColor}, ${p => p.theme.colors.secondaryColor});
//     }
// `;

// const Notch = styled.div<any>`
//     height: 21px;
//     width: 21px;
//     border: 1px solid #666;
//     margin-top: 1px;
//     background: white;
//     border-radius: 50%;
//     transition: transform 0.1s linear;
//     transform: translate(${p => p.isActive ? '26px' : '1px'});
// `;

// export const Toggle = ({ isActive, onToggle }: any) => {
//     return (
//         <ToggleWrapper onClick={() => onToggle()}>
//             <Notch isActive={isActive} />
//         </ToggleWrapper>
//     )
// }