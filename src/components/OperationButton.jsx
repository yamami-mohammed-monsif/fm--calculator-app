function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: "choose-operation", payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}

export default OperationButton;
