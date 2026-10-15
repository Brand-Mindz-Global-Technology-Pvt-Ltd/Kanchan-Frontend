import Navbar from "./components/layout/Navbar.tsx";
import HeroBanner from "./ui/HeroBanner.tsx";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <HeroBanner />
      </main>
    </div>
  );
}

export default App;
