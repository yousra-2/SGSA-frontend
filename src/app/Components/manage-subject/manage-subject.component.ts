import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Ajoutez cette ligne

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] // Ajoutez RouterModule ici
})
export class ManageSubjectComponent implements OnInit {
  matiereId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matiereId = +params['matiereId'];
    });
  }
}
