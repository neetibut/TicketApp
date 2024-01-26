import TicketCard from "./(components)/TicketCard";

type Ticket = {
  id: string; // Replace with the actual type of your ticket's ID
  category: string;
  // Add other properties of a ticket here
};

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

// Dashboard view
export default async function Home() {
  const { tickets } = await getTickets();

  // Set() function to remove duplicates
  const uniqueCategories = Array.from(
    new Set(tickets.map((ticket: Ticket) => ticket.category))
  );

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map(
            (uniqueCategory: any, categoryIndex: number) => (
              <div key={categoryIndex} className="mb-4">
                <h2>{uniqueCategory}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                  {tickets
                    .filter(
                      (ticket: Ticket) => ticket.category === uniqueCategory
                    )
                    .map((filteredTicket: Ticket, _index: any) => (
                      <TicketCard key={_index} ticket={filteredTicket} />
                    ))}
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
}
