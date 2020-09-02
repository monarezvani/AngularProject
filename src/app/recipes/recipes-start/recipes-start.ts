import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-start',
  templateUrl: './recipes-start.html',
  styleUrls: ['./recipes-start.css']
})
export class RecipesStartComponent implements OnInit {
  errorMessage: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.data['message']
  }

}
