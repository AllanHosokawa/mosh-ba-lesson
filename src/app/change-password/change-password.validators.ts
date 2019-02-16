import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ChangePasswordValidators{
    static invalidOldPassword(control: AbstractControl): Promise<ValidationErrors | null>{
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                if(control.value !== "123")
                    resolve({invalidOldPassword: true});
                else
                    resolve(null);
            }, 3000);
        });
    }

    static passwordShoulMatch(control: AbstractControl){
        let newPassword = control.get('newPassword').value;
        let confirmPassword = control.get('confirmPassword').value;

        if(newPassword !== confirmPassword)
            return {passwordShoulMatch: true}

        return null;
    }
}