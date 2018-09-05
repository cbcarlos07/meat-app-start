import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { NotificationService } from "./shared/messages/notification.service";
import { LoginService } from "./security/login/login.service";
@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private ns: NotificationService,
                private injector: Injector) {
        super()
    }
     handleError(errorResponse: HttpErrorResponse | any){
         if(errorResponse instanceof HttpErrorResponse) {
             const message = errorResponse.error.message
             switch( errorResponse.status ){
                case 401:
                   this.injector.get(LoginService).handleLogin() 
                break
                case 403:
                  this.ns.notify( message || 'Não autorizado' )
                break
                case 404:
                   this.ns.notify( message || 'Recurso não encontrado. Verifique console para mais detalhes' )
                break
             }
         }
        super.handleError(errorResponse)    
    /*    let errorMessage: string
        if( error instanceof HttpErrorResponse ){
          const body = error.error
          errorMessage = `${error.url}: ${error.status} - ${error.statusText} || '' ${body}`
        }else{
            errorMessage = error.message ? error.message : error.toString()
        }
     */   
        /*console.log( errorMessage )
        return Observable.throw(errorMessage)
        */
    }
}
