import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListService } from '../services/list.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  users: any[] = [];
  userData: any[] = [];
  showAdd!: boolean;
  userModelObj: UserModel = new UserModel();
  showUpdate!: boolean;
  selectedUser: any = null;


  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      gender: [''],
      status: ['']
    });

    this.getAllUsers();
  }

  clickAddUser() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  adduserdetails() {

    this.userModelObj.id = this.userForm.value.id;
    this.userModelObj.name = this.userForm.value.name;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.gender = this.userForm.value.gender;
    this.userModelObj.status = this.userForm.value.status;

    // const user = {
    //   name: this.userForm.value.name,
    //   email: this.userForm.value.email,
    //   gender: this.userForm.value.gender,
    //   status: this.userForm.value.status
    // };

    this.listService.addUser(this.userModelObj).subscribe(
      (res: any) => {
        console.log(res);
        alert('User added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();

        this.userForm.reset();

        this.getAllUsers(); // Refresh the user list after adding a new user
      },
      (err: any) => {
        alert('Something went wrong');
      }
    );
  }
  
  onView(user: any) {
    this.showAdd = false;
    this.showUpdate = false;
    this.selectedUser = user;
  }

  getAllUsers() {
    this.listService.fetchUsers().subscribe(
      (res: any) => {
        this.userData = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  delete(user: any) {
    this.listService.deleteUser(user.id).subscribe((res: any) => {
      alert('User deleted');
      this.getAllUsers();
    });
  }

  onEdit(user: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userForm.patchValue(user);
  }

  updateuserdetails() {
    const userId = this.userForm.value.id;
    const user = {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      gender: this.userForm.value.gender,
      status: this.userForm.value.status
    };

    this.listService.updateUser(userId, user).subscribe(
      (res: any) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.userForm.reset();

        this.getAllUsers();
      },
      (err: any) => {
        alert('Something went wrong');
      }
    );
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ListService } from '../services/list.service';
// import { UserModel } from './user.model';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   userForm!: FormGroup;
//   userModelObj: UserModel = new UserModel();
//   users: any[] = [];
//   userData: any[] = [];
//   showAdd !: boolean;
//   showUpdate !: boolean;

//   constructor(
//     private formBuilder: FormBuilder,
//     private listService: ListService
//   ) {}

//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       id: [''],
//       name: [''],
//       email: [''],
//       gender: [''],
//       status: ['']
//     });

//     this.getAllUsers();
//   }

//   clickAddUser() {
//     this.userForm.reset();
//     this.showAdd = true;
//     this.showUpdate = false;
//   }

//   adduserdetails() {
//     this.userModelObj.id = this.userForm.value.id;
//     this.userModelObj.name = this.userForm.value.name;
//     this.userModelObj.email = this.userForm.value.email;
//     this.userModelObj.gender = this.userForm.value.gender;
//     this.userModelObj.status = this.userForm.value.status;

//     this.listService.addUser(this.userModelObj).subscribe(
//       (res: any) => {
//         console.log(res);
//         alert('User added successfully');
//         let ref = document.getElementById('cancel');
//         ref?.click();

//         this.userForm.reset();

//         this.getAllUsers(); // Refresh the user list after adding a new user
//       },
//       (err: any) => {
//         alert('Something went wrong');
//       }
//     );
//   }

//   getAllUsers() {
//     this.listService.fetchUsers().subscribe(
//       (res: any) => {
//         this.userData = res.data;
//       },
//       (err: any) => {
//         console.log(err);
//       }
//     );
//   }

//   delete(user: any) {
//     this.listService.deleteUser(user.id).subscribe((res: any) => {
//       alert('User deleted');
//       this.getAllUsers();
//     });
//   }

//   onEdit(user: any) {
//     this.showAdd = false;
//     this.showUpdate = true;
//     this.userModelObj.id = user.id;
//     this.userForm.patchValue(user);
//   }

//   updateuserdetails() {
//     const userId = this.userModelObj.id; // Extract the user ID
//     const user = {
//       id: this.userForm.value.id,
//       name: this.userForm.value.name,
//       email: this.userForm.value.email,
//       gender: this.userForm.value.gender,
//       status: this.userForm.value.status
//     };
  
//     this.listService.updateUser(userId, user).subscribe(
//       (res: any) => {
//         alert('Updated Successfully');
//         let ref = document.getElementById('cancel');
//         ref?.click();
//         this.userForm.reset();
  
//         this.getAllUsers();
//       },
//       (err: any) => {
//         alert('Something went wrong');
//       }
//     );
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ListService } from '../services/list.service';
// import { UserModel } from './user.model';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   userForm!: FormGroup;
//   userModelObj: UserModel = new UserModel();
//   users: any[] = [];
//   userData: any[] = [];

//   constructor(
//     private formBuilder: FormBuilder,
//     private listService: ListService
//   ) {}

//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//       id: [''],
//       name: [''],
//       email: [''],
//       gender: [''],
//       status: ['']
//     });

//     this.getAllUsers();
//   }

//   adduserdetails() {
//     this.userModelObj.id = this.userForm.value.id;
//     this.userModelObj.name = this.userForm.value.name;
//     this.userModelObj.email = this.userForm.value.email;
//     this.userModelObj.gender = this.userForm.value.gender;
//     this.userModelObj.status = this.userForm.value.status;

//     this.listService.addUser(this.userModelObj).subscribe(
//       (res: any) => {
//         console.log(res);
//         alert('User added successfully');
//         let ref = document.getElementById('cancel');
//         ref?.click();

//         this.userForm.reset();

//         this.getAllUsers(); // Refresh the user list after adding a new user
//       },
//       (err: any) => {
//         alert('Something went wrong');
//       }
//     );
//   }

//   getAllUsers() {
//     this.listService.fetchUsers().subscribe(
//       (res: any) => {
//         this.userData = res.data;
//       },
//       (err: any) => {
//         console.log(err);
//       }
//     );
//   }

//   delete(user: any) {
//     this.listService.deleteUser(user.id)
//     .subscribe((res: any)=>{
//       alert("User deleted");
//       this.getAllUsers();
//     })
//   }

//   onEdit(user: any) {
//     this.userModelObj.id = user.id;
//     this.userForm.controls['id'].setValue(user.id);
//     this.userForm.controls['name'].setValue(user.name);
//     this.userForm.controls['email'].setValue(user.email);
//     this.userForm.controls['gender'].setValue(user.gender);
//     this.userForm.controls['status'].setValue(user.status);
//   }

//   updateuserdetails() {
//     this.userModelObj.id = this.userForm.value.id;
//     this.userModelObj.name = this.userForm.value.name;
//     this.userModelObj.email = this.userForm.value.email;
//     this.userModelObj.gender = this.userForm.value.gender;
//     this.userModelObj.status = this.userForm.value.status;

//     this.listService.updateUser(this.userModelObj,this.userModelObj.id)
//     .subscribe((res:any)=>{
//        alert("Updated Successfully");
//        let ref = document.getElementById('cancel');
//         ref?.click();
//        this.userForm.reset();

//        this.getAllUsers();
//     })
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UserModel } from './user.model';
// import { ListService } from '../services/list.service';


// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit{

//   userForm!: FormGroup;
//   userModelObj: UserModel = new UserModel();
//   user: UserModel;
//   users: any[] = [];
//   userData !: any;

//   constructor(private formBuilder: FormBuilder,
//               private listservice: ListService) {
//                 this.user = new UserModel();
//                }

//   ngOnInit(): void {
//     this.userForm = this.formBuilder.group({
//        id : [''],
//        name : [''],
//        email : [''],
//        gender : [''],
//        status : ['']
//     });

//     this.getAllUsers();

//     // this.listservice.fetchUsers()
//     // .subscribe(
//     //   (response: any) => {
//     //     this.users = response.data;
//     //   },
//     //   (error: any) => {
//     //     console.log('Error fetching users:', error);
//     //   }
//     // );
//   }

//    adduserdetails() {
//     this.userModelObj.id = this.userForm.value.id;
//     this.userModelObj.name = this.userForm.value.name;
//     this.userModelObj.email = this.userForm.value.email;
//     this.userModelObj.gender = this.userForm.value.gender;
//     this.userModelObj.status = this.userForm.value.status;

//     this.listservice.addUser(this.userModelObj)
//     .subscribe((res: any)=> {
//       console.log(res);
//       alert("User added successfully");
//       let ref = document.getElementById('cancel')
//       ref?.click();
      
//       this.userForm.reset();
//     },
//     (err: any)=>{
//       alert("Something went wrong");
//     })
//    }

//    getAllUsers() {
//     this.listservice.fetchUsers()
//     .subscribe((res: any)=>{
//        this.userData = res;
//     },
//     (err: any) => {
//       console.log(err);
//    })
//    }
// }
