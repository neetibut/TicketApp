import TicketForm from "@/app/(components)/TicketForm";
import { NextPage } from "next";

interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  category: string;
}

interface GetTicketResponse {
  foundTicket: Ticket;
}

interface TicketPageProps {
  params: {
    id: string;
  };
}

const getTicketById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to get ticket.");
  }
  return res.json();
};

let updateTicketData = {};

const TicketPage: NextPage<TicketPageProps> = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;

  if (EDITMODE) {
    const response = (await getTicketById(params.id)) as GetTicketResponse;
    updateTicketData = response.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
