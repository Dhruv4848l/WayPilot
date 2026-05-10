import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Login from './screens/Login/Login';
import Registration from './screens/Registration/Registration';
import UserProfile from './screens/UserProfile/UserProfile';
import MainLanding from './screens/MainLanding/MainLanding';
import CreateTrip from './screens/CreateTrip/CreateTrip';
import UserTripListing from './screens/UserTripListing/UserTripListing';
import CityActivitySearch from './screens/CityActivitySearch/CityActivitySearch';
import BuildItinerary from './screens/BuildItinerary/BuildItinerary';
import ItineraryView from './screens/ItineraryView/ItineraryView';
import ExpenseInvoice from './screens/ExpenseInvoice/ExpenseInvoice';
import PackingChecklist from './screens/PackingChecklist/PackingChecklist';
import AdminPanel from './screens/AdminPanel/AdminPanel';
import TripNotes from './screens/TripNotes/TripNotes';
import Community from './screens/Community/Community';

// Placeholder screen for pending phases
const PlaceholderScreen = ({ title }) => (
  <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-3xl font-display text-brand-primary mb-4">{title}</h1>
    <p className="text-text-secondary">(Under Construction - Placeholders applied)</p>
  </div>
);

const AppLayout = () => (
  <div className="min-h-screen bg-bg-base flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        {/* Protected Routes with Layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<MainLanding />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/trips" element={<UserTripListing />} />
          <Route path="/trips/new" element={<CreateTrip />} />
          <Route path="/trips/:id/build" element={<BuildItinerary />} />
          <Route path="/trips/:id/view" element={<ItineraryView />} />
          <Route path="/trips/:id/invoice" element={<ExpenseInvoice />} />
          <Route path="/trips/:id/checklist" element={<PackingChecklist />} />
          <Route path="/trips/:id/notes" element={<TripNotes />} />
          <Route path="/explore" element={<CityActivitySearch />} />
          <Route path="/checklist" element={<PackingChecklist />} />
          <Route path="/notes" element={<TripNotes />} />
          <Route path="/community" element={<Community />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
