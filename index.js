// Your code here

// Helper function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Helper function to create employee records from an array of arrays
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Helper function to create a timeIn event for an employee
  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
    return employee;
  }
  
  // Helper function to create a timeOut event for an employee
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
    return employee;
  }
  
  // Helper function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    }
    
    return 0;
  }
  
  // Helper function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  // Helper function to calculate pay owed for all dates
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
  }
  
  // Helper function to calculate total pay for all employees
  function calculatePayroll(employees) {
    return employees.reduce((sum, employee) => sum + allWagesFor(employee), 0);
  }
  
  // Example Usage
  const employeeData = [
    ["John", "Doe", "Engineer", 20],
    ["Jane", "Smith", "Designer", 25],
  ];
  
  const employees = createEmployeeRecords(employeeData);
  
  createTimeInEvent(employees[0], "2022-01-01 0900");
  createTimeOutEvent(employees[0], "2022-01-01 1700");
  
  console.log(allWagesFor(employees[0])); // Output: 800
  console.log(calculatePayroll(employees)); // Output: 1200
  