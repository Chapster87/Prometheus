import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"
const PrometheusIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 312.08 390" {...props}>
    <Defs>
      <LinearGradient
        id="prometheus_icon"
        x1={13.305}
        x2={320.08}
        y1={195}
        y2={195}
        gradientUnits="userSpaceOnUse"
      >
        <Stop
          offset={0.15}
          style={{
            stopColor: "#f73903",
          }}
        />
        <Stop
          offset={0.483}
          style={{
            stopColor: "#d76002",
          }}
        />
        <Stop
          offset={0.85}
          style={{
            stopColor: "#f8cc2a",
          }}
        />
      </LinearGradient>
    </Defs>
    <Path
      fill="url(#prometheus_icon)"
      d="M35.01 181.1c3.83 26.12 3.74 66.52 36.81 64.78 16.81-1.64 25.79-13.56 26.4-34.25.43-14.66-1.96-28.99-5.26-43.05C75.66 98.87 115.68 39.87 171.94 0c-11.07 44.96-24.08 87.19-2.11 130.53 8.97 16.81 22.37 28.87 40.1 35.6 44.84 16.03 15-61.66 9.67-82.54 12.25 5.72 20.34 13.46 28.13 21.08 44.36 43.4 71.15 94.11 62.84 158.25-7.5 71.71-67.67 110.89-133.29 125.9-6.69 1.45-14.43 2.84-19.3-4.08-4.4-6.25-.44-12.62 2.02-18.29 5.32-12.3 11.77-24.12 17.19-36.38 21.21-48.05 8.65-97.2-34-131.54 6.02 58.88-5.62 125.18-60.16 157.63-9.97 6.14-21.31 7.23-32.4 1.65C-8.61 327.96-18.5 223.56 35.01 181.1z"
    />
  </Svg>
)
export default PrometheusIcon