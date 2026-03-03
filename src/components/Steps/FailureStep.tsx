function FailureStep({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">✗</div>
        <h2 className="text-2xl font-light">Failed to Reserve Seat</h2>
        <p className="text-slate-500">Please try again later.</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onRetry}>
          Try Again
        </button>
    </div>
  );
}

export default FailureStep;