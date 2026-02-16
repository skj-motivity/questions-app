type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

const OptionButton = ({ label, selected, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 rounded-lg border transition 
      ${
        selected
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-gray-100 hover:bg-gray-200 border-gray-300"
      }`}
    >
      {label}
    </button>
  );
};

export default OptionButton;
