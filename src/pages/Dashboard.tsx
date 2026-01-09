const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-10">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-text mb-4">Dashboard</h1>
        <p className="text-secondary mb-8">Welcome! You are logged in.</p>
        <button
          onClick={handleLogout}
          className="w-full py-3 text-base font-semibold text-white bg-accent border-none rounded-xl cursor-pointer transition-all duration-200 hover:bg-accent-hover"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
