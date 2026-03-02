function CompleteStep() {
  return (
    <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-light">Seat Reserved</h2>
        <p className="text-slate-500">Valid for today, {new Date().toLocaleDateString()}</p>
        <p className="text-slate-400 mt-2 font-mono text-xs">ID: {crypto.randomUUID()}</p>
    </div>
  );
}

export default CompleteStep;