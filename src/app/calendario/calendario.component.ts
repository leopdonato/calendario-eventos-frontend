import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  public calendarPlugins = [dayGridPlugin];

  public fasArrowCircleLeft = faArrowCircleLeft;

  constructor() { }

  ngOnInit() {
    /*this.options = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      events: [
        { title: '', start  : '2020-02-06T12:30:00',end : '2020-02-10' },
        { title: 'event 2', start: '2020-02-22T12:30:00', end: '2020-02-22T13:30:00'}
      ]
      ,
      defaultView: 'dayGridMonth',
      weekends: true,
      plugins: this.calendarPlugins,
      locale: 'br'
    }
    */
  }

}
