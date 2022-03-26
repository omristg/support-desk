import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth.slice'
import ticketReducer from '../features/tickets/ticket.slice'
import noteReducer from '../features/note/note.slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ticket: ticketReducer,
		note: noteReducer

	},
});
