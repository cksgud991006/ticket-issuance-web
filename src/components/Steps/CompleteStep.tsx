function CompleteStep({ onReload }: { onReload: () => void }) {
  return (
    <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-light">Seat Reserved</h2>
        <p className="text-slate-500">Valid for today, {new Date().toLocaleDateString()}</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onReload}>
            Reserve Another Seat
        </button>
    </div>
  );
}

export default CompleteStep;