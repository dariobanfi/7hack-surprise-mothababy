import sunny from './weathericons/sunny.png'
import partlyCloudy from './weathericons/partlyCloudy.png'
import cloudy from './weathericons/cloudy.png'
import overcast from './weathericons/overcast.png'
import foggy from './weathericons/foggy.png'
import drizzly from './weathericons/drizzly.png'
import lightDrizzly from './weathericons/lightDrizzly.png'
import showers from './weathericons/showers.png'
import rainSnow from './weathericons/rainSnow.png'
import thunderstorm from './weathericons/thunderstorm.png'
import snow from './weathericons/snow.png'

const weatherConditionMap = {
	0: {weatherDescription: "sunny weather", weatherIcon: sunny },
	1: {weatherDescription: "partly cloudy weather", weatherIcon: partlyCloudy },
	2: {weatherDescription: "cloudy weather", weatherIcon: cloudy },
	3: {weatherDescription: "overcast weather", weatherIcon: overcast },
	10: {weatherDescription: "partly cloudy weather", weatherIcon: partlyCloudy },
	20: {weatherDescription: "cloudy weather", weatherIcon: cloudy },
	30: {weatherDescription: "overcast weather", weatherIcon: overcast },
	4: {weatherDescription: "foggy weather", weatherIcon: foggy },
	40: {weatherDescription: "foggy weather", weatherIcon: foggy },
	45: {weatherDescription: "foggy weather", weatherIcon: foggy },
	48: {weatherDescription: "freezing foggy weather", weatherIcon: foggy },
	49: {weatherDescription: "freezing foggy weather", weatherIcon: foggy },
	5: {weatherDescription: "drizzly weather", weatherIcon: drizzly },
	50: {weatherDescription: "drizzly weather", weatherIcon: drizzly },
	51: {weatherDescription: "light drizzly weather", weatherIcon: lightDrizzly },
	53: {weatherDescription: "drizzly weather", weatherIcon: drizzly },
	55: {weatherDescription: "heavy drizzly weather", weatherIcon: showers },
	56: {weatherDescription: "light freezing drizzly weather",  weatherIcon: lightDrizzly },
	57: {weatherDescription: "intense freezing drizzly weather", weatherIcon: lightDrizzly },
	6: {weatherDescription: "rainy weather", weatherIcon: drizzly },
	60: {weatherDescription: "light rain", weatherIcon: drizzly },
	61: {weatherDescription: "light rain", weatherIcon: drizzly },
	63: {weatherDescription: "modest rain", weatherIcon: drizzly },
	65: {weatherDescription: "heavy rain", weatherIcon: showers },
	66: {weatherDescription: "light freezing rain", weatherIcon: rainSnow },
	67: {weatherDescription: "modest freezing rain", weatherIcon: rainSnow },
	68: {weatherDescription: "light rain snow", weatherIcon: rainSnow },
	69: {weatherDescription: "heavy rain snow", weatherIcon: rainSnow },
	7: {weatherDescription: "snow", weatherIcon: snow },
	70: {weatherDescription: "light snow", weatherIcon: snow },
	71: {weatherDescription: "light snow", weatherIcon: snow },
	73: {weatherDescription: "modest snow", weatherIcon: snow },
	75: {weatherDescription: "heavy snow", weatherIcon: snow },
	8: {weatherDescription: "showers", weatherIcon: showers },
	80: {weatherDescription: "light rain showers", weatherIcon: showers },
	81: {weatherDescription: "rain showers", weatherIcon: showers },
	82: {weatherDescription: "heavy rain showers", weatherIcon: showers },
	83: {weatherDescription: "light showers", weatherIcon: showers },
	84: {weatherDescription: "heavy showers", weatherIcon: showers },
	85: {weatherDescription: "light snowy showers", weatherIcon: showers },
	86: {weatherDescription: "heavy snowy showers", weatherIcon: showers },
	9: {weatherDescription: "thunderstorms", weatherIcon: thunderstorm },
	90: {weatherDescription: "thunderstorms", weatherIcon: thunderstorm },
	95: {weatherDescription: "light thunderstorms", weatherIcon: thunderstorm },
	96: {weatherDescription: "heavy thunderstorms", weatherIcon: thunderstorm },
	999: {weatherDescription: "uninteresting weather", weatherIcon: cloudy },
}

export const mapWeatherCondition = (weatherConditionId) => weatherConditionMap[weatherConditionId]
