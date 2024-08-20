import Heading from "../ui/Heading";
import Row from "../ui/Row.jsx";
import DashboardLayout from "../features/dashboard/DashboardLayout.jsx";
import DashboardFilter from "../features/dashboard/DashboardFilter.jsx";
import AddBooking from "../features/bookings/AddBooking.jsx";

function Dashboard() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Dashboard</Heading>
                <DashboardFilter />
            </Row>
            <Row>
                <DashboardLayout/>
            </Row>
            <AddBooking />

        </>)
}

export default Dashboard;
