export const FORMULA_DB = [
    // --- GEOMETRY ---
    {
        id: 'geo_circle_area',
        name: 'Area of Circle',
        category: 'Geometry',
        description: 'Calculate the area of a circle given its radius.',
        formula: 'PI * r^2',
        inputs: [{ name: 'r', label: 'Radius (r)', default: 1 }],
        unit: 'm²'
    },
    {
        id: 'geo_sphere_vol',
        name: 'Volume of Sphere',
        category: 'Geometry',
        description: 'Volume enclosed by a sphere.',
        formula: '(4/3) * PI * r^3',
        inputs: [{ name: 'r', label: 'Radius (r)', default: 1 }],
        unit: 'm³'
    },
    {
        id: 'geo_triangle_area',
        name: 'Area of Triangle',
        category: 'Geometry',
        description: 'Area using base and height.',
        formula: '0.5 * b * h',
        inputs: [{ name: 'b', label: 'Base (b)' }, { name: 'h', label: 'Height (h)' }],
        unit: 'm²'
    },
    {
        id: 'geo_hypotenuse',
        name: 'Pythagoras Theorem',
        category: 'Geometry',
        description: 'Find hypotenuse of right triangle.',
        formula: 'sqrt(a^2 + b^2)',
        inputs: [{ name: 'a', label: 'Side A' }, { name: 'b', label: 'Side B' }],
        unit: 'm'
    },
    {
        id: 'geo_cyl_vol',
        name: 'Volume of Cylinder',
        category: 'Geometry',
        description: 'Volume of a cylinder.',
        formula: 'PI * r^2 * h',
        inputs: [{ name: 'r', label: 'Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        unit: 'm³'
    },
    {
        id: 'geo_cone_vol',
        name: 'Volume of Cone',
        category: 'Geometry',
        description: 'Volume of a cone.',
        formula: '(1/3) * PI * r^2 * h',
        inputs: [{ name: 'r', label: 'Radius (r)' }, { name: 'h', label: 'Height (h)' }],
        unit: 'm³'
    },

    // --- PHYSICS ---
    {
        id: 'phy_newton2',
        name: 'Newton\'s Second Law',
        category: 'Physics',
        description: 'Force = Mass x Acceleration',
        formula: 'm * a',
        inputs: [{ name: 'm', label: 'Mass (m)' }, { name: 'a', label: 'Acceleration (a)' }],
        unit: 'N'
    },
    {
        id: 'phy_ke',
        name: 'Kinetic Energy',
        category: 'Physics',
        description: 'Energy of motion.',
        formula: '0.5 * m * v^2',
        inputs: [{ name: 'm', label: 'Mass (m)' }, { name: 'v', label: 'Velocity (v)' }],
        unit: 'J'
    },
    {
        id: 'phy_pe',
        name: 'Potential Energy',
        category: 'Physics',
        description: 'Gravitational potential energy.',
        formula: 'm * g * h',
        inputs: [{ name: 'm', label: 'Mass (m)' }, { name: 'h', label: 'Height (h)' }],
        unit: 'J'
    },
    {
        id: 'phy_ohm',
        name: 'Ohm\'s Law',
        category: 'Physics',
        description: 'Voltage in a circuit.',
        formula: 'I * R_res',
        inputs: [{ name: 'I', label: 'Current (I)' }, { name: 'R_res', label: 'Resistance (R)' }],
        unit: 'V'
    },
    {
        id: 'phy_power',
        name: 'Electric Power',
        category: 'Physics',
        description: 'Power in a circuit.',
        formula: 'V * I',
        inputs: [{ name: 'V', label: 'Voltage (V)' }, { name: 'I', label: 'Current (I)' }],
        unit: 'W'
    },
    {
        id: 'phy_grav',
        name: 'Gravitational Force',
        category: 'Physics',
        description: 'Force between two masses.',
        formula: '(G * m1 * m2) / r^2',
        inputs: [{ name: 'm1', label: 'Mass 1' }, { name: 'm2', label: 'Mass 2' }, { name: 'r', label: 'Distance (r)' }],
        unit: 'N'
    },
    {
        id: 'phy_wave',
        name: 'Wave Equation',
        category: 'Physics',
        description: 'Velocity of a wave.',
        formula: 'f * lambda',
        inputs: [{ name: 'f', label: 'Frequency (f)' }, { name: 'lambda', label: 'Wavelength (λ)' }],
        unit: 'm/s'
    },
    {
        id: 'phy_density',
        name: 'Density',
        category: 'Physics',
        description: 'Mass per unit volume.',
        formula: 'm / V',
        inputs: [{ name: 'm', label: 'Mass (m)' }, { name: 'V', label: 'Volume (V)' }],
        unit: 'kg/m³'
    },
    {
        id: 'phy_pressure',
        name: 'Pressure',
        category: 'Physics',
        description: 'Force per unit area.',
        formula: 'F / A',
        inputs: [{ name: 'F', label: 'Force (F)' }, { name: 'A', label: 'Area (A)' }],
        unit: 'Pa'
    },
    {
        id: 'phy_einstein',
        name: 'Mass-Energy Equivalence',
        category: 'Physics',
        description: 'E=mc²',
        formula: 'm * c^2',
        inputs: [{ name: 'm', label: 'Mass (m)' }],
        unit: 'J'
    },

    // --- ALGEBRA ---
    {
        id: 'alg_quad_pos',
        name: 'Quadratic Formula (+)',
        category: 'Algebra',
        description: 'Positive root of ax² + bx + c = 0',
        formula: '(-b + sqrt(b^2 - 4*a*c)) / (2*a)',
        inputs: [{ name: 'a', label: 'a' }, { name: 'b', label: 'b' }, { name: 'c', label: 'c' }],
        unit: ''
    },
    {
        id: 'alg_slope',
        name: 'Slope of Line',
        category: 'Algebra',
        description: 'Slope between two points.',
        formula: '(y2 - y1) / (x2 - x1)',
        inputs: [{ name: 'x1', label: 'x1' }, { name: 'y1', label: 'y1' }, { name: 'x2', label: 'x2' }, { name: 'y2', label: 'y2' }],
        unit: ''
    },
    {
        id: 'alg_dist',
        name: 'Distance Formula',
        category: 'Algebra',
        description: 'Distance between two points.',
        formula: 'sqrt((x2 - x1)^2 + (y2 - y1)^2)',
        inputs: [{ name: 'x1', label: 'x1' }, { name: 'y1', label: 'y1' }, { name: 'x2', label: 'x2' }, { name: 'y2', label: 'y2' }],
        unit: ''
    },
    {
        id: 'alg_arith_sum',
        name: 'Arithmetic Series Sum',
        category: 'Algebra',
        description: 'Sum of first n terms.',
        formula: '(n/2) * (2*a + (n-1)*d)',
        inputs: [{ name: 'n', label: 'Count (n)' }, { name: 'a', label: 'First term (a)' }, { name: 'd', label: 'Diff (d)' }],
        unit: ''
    },
    {
        id: 'alg_geo_sum',
        name: 'Geometric Series Sum',
        category: 'Algebra',
        description: 'Sum of first n terms.',
        formula: 'a * (1 - r^n) / (1 - r)',
        inputs: [{ name: 'a', label: 'First term (a)' }, { name: 'r', label: 'Ratio (r)' }, { name: 'n', label: 'Count (n)' }],
        unit: ''
    },

    // --- HEALTH ---
    {
        id: 'health_bmi',
        name: 'BMI',
        category: 'Health',
        description: 'Body Mass Index (mass in kg, height in m)',
        formula: 'weight / height^2',
        inputs: [{ name: 'weight', label: 'Weight (kg)' }, { name: 'height', label: 'Height (m)' }],
        unit: 'kg/m²'
    },
    {
        id: 'health_bmr_m',
        name: 'BMR (Miffin-St Jeor) - Male',
        category: 'Health',
        description: 'Basal Metabolic Rate for Men',
        formula: '(10 * w) + (6.25 * h) - (5 * a) + 5',
        inputs: [{ name: 'w', label: 'Weight (kg)' }, { name: 'h', label: 'Height (cm)' }, { name: 'a', label: 'Age (yrs)' }],
        unit: 'kcal'
    },
    {
        id: 'health_bmr_f',
        name: 'BMR (Miffin-St Jeor) - Female',
        category: 'Health',
        description: 'Basal Metabolic Rate for Women',
        formula: '(10 * w) + (6.25 * h) - (5 * a) - 161',
        inputs: [{ name: 'w', label: 'Weight (kg)' }, { name: 'h', label: 'Height (cm)' }, { name: 'a', label: 'Age (yrs)' }],
        unit: 'kcal'
    },
    {
        id: 'health_bsa',
        name: 'Body Surface Area (Mosteller)',
        category: 'Health',
        description: 'Estimate of body area.',
        formula: 'sqrt((w * h) / 3600)',
        inputs: [{ name: 'w', label: 'Weight (kg)' }, { name: 'h', label: 'Height (cm)' }],
        unit: 'm²'
    },

    // --- FINANCE (Basic ones to complement calc) ---
    {
        id: 'fin_roi',
        name: 'Return on Investment',
        category: 'Finance',
        description: 'ROI Percentage',
        formula: '((gain - cost) / cost) * 100',
        inputs: [{ name: 'gain', label: 'Current Value' }, { name: 'cost', label: 'Cost of Investment' }],
        unit: '%'
    },
    {
        id: 'fin_markup',
        name: 'Markup Percentage',
        category: 'Finance',
        description: 'Markup based on cost.',
        formula: '((price - cost) / cost) * 100',
        inputs: [{ name: 'price', label: 'Sell Price' }, { name: 'cost', label: 'Cost' }],
        unit: '%'
    },
    {
        id: 'fin_margin',
        name: 'Profit Margin',
        category: 'Finance',
        description: 'Margin based on price.',
        formula: '((price - cost) / price) * 100',
        inputs: [{ name: 'price', label: 'Sell Price' }, { name: 'cost', label: 'Cost' }],
        unit: '%'
    },
    {
        id: 'fin_be',
        name: 'Break-Even Point',
        category: 'Finance',
        description: 'Units to sell to cover costs.',
        formula: 'fixed / (price - variable)',
        inputs: [{ name: 'fixed', label: 'Fixed Costs' }, { name: 'price', label: 'Price/Unit' }, { name: 'variable', label: 'Variable Cost/Unit' }],
        unit: 'units'
    },

    // --- MISC / CONVERSIONS ---
    {
        id: 'conv_c_to_f',
        name: 'Celsius to Fahrenheit',
        category: 'Physics',
        formula: '(C * 9/5) + 32',
        inputs: [{ name: 'C', label: 'Celsius' }],
        unit: '°F'
    },
    {
        id: 'conv_f_to_c',
        name: 'Fahrenheit to Celsius',
        category: 'Physics',
        formula: '(F - 32) * 5/9',
        inputs: [{ name: 'F', label: 'Fahrenheit' }],
        unit: '°C'
    }
];

export const CATEGORIES = ['All', 'Geometry', 'Physics', 'Algebra', 'Finance', 'Health'];
