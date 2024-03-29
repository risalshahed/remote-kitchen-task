export default function Toast({ message }) {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span className="text-white">{ message }</span>
      </div>
    </div>
  )
}