import * as React from 'react'

function PageIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.833 3.667H30.25l8.25 8.25v22.916"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 37.583V11.917a2.75 2.75 0 012.75-2.75h17.879a1.1 1.1 0 01.777.322l5.771 5.772a1.101 1.101 0 01.323.78v21.542a2.75 2.75 0 01-2.75 2.75h-22a2.75 2.75 0 01-2.75-2.75z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.667 15.4V9.816a.649.649 0 011.107-.459l6.035 6.036a.646.646 0 01-.458 1.107h-5.584a1.1 1.1 0 01-1.1-1.1z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PageIcon
