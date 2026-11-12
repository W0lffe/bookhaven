/**
 * A reusable input component that provides a label and a styled input field.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.type - The type of input (e.g., "text", "password").
 * @param {string} props.stateValue - The current value of the input.
 * @param {Function} props.setState - Function to update the state value.
 * @param {string} props.label - The label text to display above the input.
 * 
 * @returns {JSX.Element} The rendered input component.
 */
export default function UserInput({ type, stateValue, setState, label }) {
 
  return (
    <div className="mb-4">
      <label htmlFor={type} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={type}
        value={stateValue}
        onChange={(e) => setState(e.target.value)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required
      />
    </div>
  );
}