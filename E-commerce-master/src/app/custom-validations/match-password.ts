import { AbstractControl, ValidationErrors, Validator } from '@angular/forms';

// export class MatchPassword implements Validator{
//   validate(control: AbstractControl<any, any>): ValidationErrors | null {
//     // throw new Error("Method not implemented.");
//         let password=control.value.password;
//         let rePassword=control.value.rePassword;
//         if (password==rePassword && password &&rePassword) {
//           return null;
//         } else {
//           return {passwordMisMatch:true}
//         }
//   }

// }

export let passwordMatch = (
  control: AbstractControl
): ValidationErrors | null => {
  // let password = control.value.password;
  // let rePassword = control.value.rePassword;

  // if (password == rePassword && password && rePassword) {
  //   return null;
  //   } else {
  //     return { passwordMisMatch: true };
  //     }

  // *** ------------------
  let { password, rePassword } = control.value;
  return password == rePassword && password && rePassword
    ? null
    : { passwordMisMatch: true };
};
