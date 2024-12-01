import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type MedicalExaminationWidgetType = {
  date: string;
  time: string;
  location: string;
};

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private widgetDataSubject = new BehaviorSubject<MedicalExaminationWidgetType[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(true);

  widgetData$: Observable<MedicalExaminationWidgetType[]> = this.widgetDataSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {
    // TODO: Fetch data from the server && listen for real-time updates
    this.initializeData();
    // this.simulateSocketUpdates();
  }

  private initializeData() {
    // Simulating a fetch delay
    setTimeout(() => {
      const initialData: MedicalExaminationWidgetType[] = [
        { date: '2024-12-02', time: '10:00 AM', location: 'Clinic A' },
        { date: '2024-12-01', time: '2:00 PM', location: 'Clinic B' },
      ];
      this.widgetDataSubject.next(initialData);
      this.loadingSubject.next(false); // Emit loading completion
    }, 2000); // Simulate a 1-second API call
  }

  private simulateSocketUpdates() {
    setInterval(() => {
      const randomUpdate: MedicalExaminationWidgetType = {
        date: `2024-12-${Math.floor(Math.random() * 30 + 1).toString().padStart(2, '0')}`,
        time: `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${
          Math.random() > 0.5 ? 'AM' : 'PM'
        }`,
        location: `Clinic ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
      };
      const currentData = this.widgetDataSubject.getValue();
      this.widgetDataSubject.next([...currentData, randomUpdate]);
    }, 2000); // Simulate real-time updates every 5 seconds
  }

  addWidgetData(newData: MedicalExaminationWidgetType) {
    const currentData = this.widgetDataSubject.getValue();
    this.widgetDataSubject.next([...currentData, newData]);
  }
}