import { Component, OnInit } from '@angular/core';
import {projects, employees, connectors} from '../sharedData';
import {SharedService} from '../services/shared.service';
import {Observable, of, pipe} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  projects: any = projects;
  details: any = [];
  posts;
  status = false;
  squaredNums: any = [];
  squaredOddValues;
  constructor(private service: SharedService) {
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
      this.posts = response;
    }, (error: Response) => {
        if (error.status === 404) {
          alert('Page Not found');
        } else {
          alert('An unexpected error occurred');
          console.log(error);
        }
    });
  }

  createPost(inputTitle: HTMLInputElement, inputBody: HTMLInputElement, inputId: HTMLInputElement) {
    const post: any = {
      title: inputTitle.value,
      body: inputBody.value,
      id: inputId.value
    };
    inputTitle.value = '';
    inputBody.value = '';
    inputId.value = '';

    this.service.createPosts(post)
      .subscribe(response => {
      // post.id = response.id;
        this.posts.splice(0, 0, post);
        console.log('post: ', post);
    }, (error: Response) => {
        if (error.status === 400 || error.status === 404) {
          alert('This post already exist');
        } else {
          alert('An unexpected error occurred');
          console.log(error);
        }
    });
  }
  updatePost(post) {
    this.service.updatePosts(post)
      .subscribe(response => {
        console.log(response);
        console.log(this.posts[1]);
      }, error => {
      alert('An unexpected error occurred');
      console.log(error);
    });
  }
  deletePost(post) {
    this.service.deletePosts(post)
      .subscribe(response => {
      const index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    }, (error: Response) => {
        if (error.status === 404 || error.status === 400) {
          alert('This post has been already deleted');
        } else {
          alert('An unexpected error occurred');
          console.log(error);
        }
    });
  }

  createForm() {
    this.status = true;
  }

  squaredValues() {
    console.log('map operator example in rxjs');

    const nums = of(1, 2, 3, 4);

    nums.pipe(map((val: number) => val * val)).subscribe(x => {
      this.squaredNums = x;
      console.log(x);
    });

    const squareOddVals = pipe(
      filter((n: number) => n % 2 !== 0), map(n => n * n)
    );

// Create an Observable that will run the filter and map functions
    squareOddVals(nums).subscribe(x => {
      this.squaredOddValues = x;
      console.log(x);
    });
  }

  getDetails() {
    const obs = new Observable((sub) => {
      const id = setInterval(() => {
        sub.next(this.projects);
        // sub.error('error occurred');
        sub.complete();
        sub.next('Second value');
      }, 1000);
    }).subscribe(res => {
      this.details = res;
      console.log(res);
    });
  }


}
