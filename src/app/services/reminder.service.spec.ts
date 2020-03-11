import { ReminderService } from "./reminder.service";
import { Reminder } from '../models/reminder.model';

describe('Add Reminder validations', () => {
    let reminderService: ReminderService;

    beforeEach(() => {
        reminderService = new ReminderService();
    });

    it('All reminder data is ok!', () => {

        let reminder = new Reminder();
        reminder.Id = 0;
        reminder.Title='Test 1';
        reminder.City='Quito';
        reminder.DateTime = new Date();
        reminder.Color = '#ffffff';

        const id = reminderService.addReminder(reminder);
        
        expect(id).toBeGreaterThan(0);

    });

    it('Title longer than 30 characters', () => {

        let reminder = new Reminder();
        reminder.Id = 0;
        reminder.Title='This is a long string for more than 30 characters!!!!!';
        reminder.City='Quito';
        reminder.DateTime = new Date();
        reminder.Color = '#ffffff';

        const id = reminderService.addReminder(reminder);
        
        expect(id).toEqual(0);

    });
});