import { Event } from '@/mocks/events';
import styles from './EventList.module.scss';

interface EventListProps {
  events: Event[];
}

const EventList = ({ events }: EventListProps) => {
  if (!events || events.length === 0) {
    return <div className={styles.noEvents}>No events for this period.</div>;
  }

  return (
    <div className={styles.eventListContainer}>
      <div className={styles.eventList}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventItem}>
            <span>{new Date(event.date).getFullYear()}</span>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
