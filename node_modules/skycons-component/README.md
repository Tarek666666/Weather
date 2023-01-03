# skycons-component
A simple to use component specially made for the darksky API.

## Get started

	yarn add skycons-component
	npm install skycons-component


## Usage
The component comes with properties that allows you to customize according to your desire.
The properties that are supported by the component is the following.

**animate** - All the darksky icons comes with animations. This allows you to controll the animation. Default value for this is true. Do disable the animation, pass false to the component.

**icon** - The icon that should be presented. The component is made in such way that the values grabbed from the skycons api can be passed directly to the component. There is no default value for this propertie.

**iconColor** - This represents the color of the icon. Default is black.

**style** - This allows you to style your component with plain css.

## Basic Example

```javascript
import Skycons from 'skycons-component'
const Skycons = require('skycons-component')

const SomeComponent = props => {
	return (
	    <div>
        	<Skycons
      	  	 animate={false}
	  	 iconColor='orange'
	  	 style={{width: 64, height: 64}}
	  	 icon='rain'
       		/>
    	    </div>
	)
}

```
