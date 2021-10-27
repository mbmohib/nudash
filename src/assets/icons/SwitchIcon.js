function SwitchIcon(props) {
  return (
    <svg
      width={34}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 10C0 4.477 4.477 0 10 0h14c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10z"
        fill="#fff"
      />
      <rect x={16} y={2} width={16} height={16} rx={8} fill="#141430" />
    </svg>
  );
}

export default SwitchIcon;
