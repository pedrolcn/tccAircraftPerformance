/**
 * Helper class implementing ISA standard atmosphere equations
 */
export default class AtmosIsa {  
  protected static L = 0.0065; // Lapse Rate [K/m]
  protected static g = 9.81; // Sea level gravity [m/s^2]
  protected static T0 = 288; // Sea level temperature [K]
  protected static R = 287; // Gas constant for air [m^2/(s^2 * K)]
  protected static P0 = 101325; // Sea level pressure [Pa]
  protected static gamma = 1.4; // Ratio of specific heats for air

  /**
   * Calculates ISA standard atmosphere temperature at a given height  
   * ** ONLY VALID BELOW 10,000m **
   * 
   * @param h height in meters above sea level
   */
  public static temperature(h: number) {
    return AtmosIsa.T0 - AtmosIsa.L * h; 
  }

  /**
   * Calculates ISA standard atmosphere pressure at a given height  
   * ** ONLY VALID BELOW 10,000m **
   * 
   * @param h height in meters above sea level
   */
  public static pressure(h: number) {
    return AtmosIsa.P0 * (AtmosIsa.temperature(h) / AtmosIsa.T0) ** (AtmosIsa.g / (AtmosIsa.L * AtmosIsa.R));
  }

  /**
   * Calculates ISA standard atmosphere density at a given height  
   * ** ONLY VALID BELOW 10,000m **
   * 
   * @param h height in meters above sea level
   */
  public static density(h: number) {
    return AtmosIsa.pressure(h) / (AtmosIsa.R * AtmosIsa.temperature(h));
  }

  /**
   *
   * Calculates ISA standard atmosphere speef of sound at a given height  
   * ** ONLY VALID BELOW 10,000m **
   *
   * @param h height in meters above sea level
   */
  public static soundSpeed(h: number) {
    return Math.sqrt(AtmosIsa.gamma * AtmosIsa.R * AtmosIsa.temperature(h));
  }
}
