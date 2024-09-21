import { Timeline, TimelineEvent } from './TimeLineExp';

export function calculateDuration(startDate: string, showMonths: boolean): string {
  const start: Date = new Date(startDate);
  const now: Date = new Date();
  const diff: number = now.getTime() - start.getTime();
  const diffDate: Date = new Date(diff);
  const years: number = diffDate.getUTCFullYear() - 1970;
  const months: number = diffDate.getUTCMonth();

  if (years === 1 && months === 0) {
    return "1 year";
  } else if (!showMonths) {
    return `${years} years`;
  } else {
    return `${years} yr ${months} mos`;
  }
}

const CurrentTimeLineExp = () => {
  return (
    <Timeline>

      <TimelineEvent active>

        <TimelineEvent.Title><a href='https://www.ia.com.mx' target='_blank' rel='noopener noreferrer' className='hover:text-white hover:underline transition-all ease'>eProd Solutions</a> | May. 2024 - {calculateDuration('2024-03-01', true)}</TimelineEvent.Title>

        <TimelineEvent.Description>
          Acquired proficiency in the codebase and honed coding skills.
          Conducted analysis of user requirements and software needs to inform system design.
          Developed software applications and programs for both backend and frontend purposes.
          Evaluated programs and applications to enhance their features and functionalities.
        </TimelineEvent.Description>

      </TimelineEvent>

      <TimelineEvent last>

        <TimelineEvent.Title>Freelance | Feb. 2021 - Mar. 2024</TimelineEvent.Title>

        <TimelineEvent.Description>
          Design and development of web pages applying agile methodologies, clean architecture, SOLID principles and pixel perfect in all projects, I have developed almost all types of projects from Landing pages, stores, blogs and dashboards.
        </TimelineEvent.Description>

      </TimelineEvent>


    </Timeline>
  )
}

export default CurrentTimeLineExp;