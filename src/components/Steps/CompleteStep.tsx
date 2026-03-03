function CompleteStep() {
  return (
    <div className="text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-light">Seat Reserved</h2>
        <p className="text-slate-500">Valid for today, {new Date().toLocaleDateString()}</p>
    </div>
  );
}

export default CompleteStep;