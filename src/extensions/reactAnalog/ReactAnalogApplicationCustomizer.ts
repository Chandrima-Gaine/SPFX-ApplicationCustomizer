import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';  
import * as ReactDOM from "react-dom"; 
import {
  BaseApplicationCustomizer,
  PlaceholderContent,  
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';
import reactAnalog, { IreactAnalogProps } from './reactAnalog';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'ReactAnalogApplicationCustomizerStrings';
import styles from './AppCustomizer.module.scss';

const LOG_SOURCE: string = 'ReactAnalogApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IReactAnalogApplicationCustomizerProperties {
  // This is an example; replace with your own property
  Top: string;
  Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ReactAnalogApplicationCustomizer
  extends BaseApplicationCustomizer<IReactAnalogApplicationCustomizerProperties> {

    // These have been added
    private _topPlaceholder: PlaceholderContent | undefined;
    private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

     this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private _renderPlaceHolders(): void {  
    console.log("HelloWorldApplicationCustomizer._renderPlaceHolders()");  
    console.log(  
      "Available placeholders: ",  
      this.context.placeholderProvider.placeholderNames  
        .map(name => PlaceholderName[name])  
        .join(", ")  
    );  
    // Handling the top placeholder  
    if (!this._topPlaceholder)   
    {  
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(  
        PlaceholderName.Top,  
        { onDispose: this._onDispose }  
      );  
 // The extension should not assume that the expected placeholder is available.  
      if (!this._topPlaceholder)   
      {  
        console.error("The expected placeholder (Top) was not found.");  
        return;  
      }  
      if (this.properties) {  
        let topString: string = this.properties.Top;  
        if (!topString) {  
          topString = "(Top property was not defined.)";  
        }  
        
          if (this._topPlaceholder.domElement) {  

            /*
            this._topPlaceholder.domElement.innerHTML = `
            <div class="${styles.rectapp}">
              <div class="${styles.top}">
                <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                  topString
                )}
              </div>
            </div>`;
            */

          const elem: React.ReactElement<IreactAnalogProps> = React.createElement(  
          reactAnalog,{});  
          ReactDOM.render(elem, this._topPlaceholder.domElement);   
        }       
     }  
    } 
    
    // Handling the bottom placeholder
 		if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = this.properties.Bottom;
        if (!bottomString) {
          bottomString = "(Bottom property was not defined.)";
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.rectapp}">
            <div class="${styles.bottom}">
              <i class="ms-Icon ms-Icon--Info" aria-hidden="true"></i> ${escape(
                bottomString
              )}
            </div>
          </div>`;
        }
      }
    }
  }

  private _onDispose(): void   
  {  
    console.log('[ReactAnalogApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');  
  }
}
