import * as React from 'react';  
import Clock from 'react-clock';  
import styles from './AppCustomizer.module.scss';  
export interface IreactAnalogProps {  
     
}  
export interface IreactAnalogPropsoState {  
    currentTime: Date;  
}  
export default class reactAnalog extends React.Component<IreactAnalogProps,IreactAnalogPropsoState> {  
    constructor(props: IreactAnalogProps) {  
        super(props);  
       this.startClock();  
        this.state = {  
         currentTime : new Date()  
      };  
     }  
     public startClock() {  
        setInterval(() => {  
         console.log("updating time");  
         this.setState({  
           currentTime: new Date()  
        });  
      }, 1000);  
    }  
  public render(): JSX.Element {  
  return ( 
    <div className={styles.rectapp}>
      <div className={styles.mycustom}>
        <p>Chandrima-React-analog-Clock</p>
          <div className={styles.rectapp}>   
            <div className={styles.topclock}>  
              <Clock   
                value={this.state.currentTime}   
              />
          </div>
        </div> 
    </div>
  </div>   
  );  
 }  
} 