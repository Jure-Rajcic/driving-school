// export interface StatisticsServiceI {
//     getParameterFunctionPairs(): { parameter: string, functionName: string }[];
//     async executeFunctionByName(functionName: string, ...args: any[]): Promise<any>;
// }

// // export class PsychoTestStatisticsService implements StatisticsServiceI {
// //     getParameterFunctionPairs(): { parameter: string; functionName: string; }[] {
// //         return [
// //             { parameter: 'TimeSpentOnSection', functionName: 'TimeSpentOnSection' },
// //             { parameter: 'NumberOfTestsSolved', functionName: 'NumberOfTestsSolved' },
// //         ];
// //     }

// //     async TimeSpentOnSection() : Promise<number> {
// //         return 10;
// //     }
    
// //     async NumberOfTestsSolved() : Promise<number> {
// //         return 20;
// //     }



// //     async executeFunctionByName(functionName: string, ...args: any[]) : Promise<any> {
// //         return (this[functionName] as Function) (...args);
// //     }
    
// // }