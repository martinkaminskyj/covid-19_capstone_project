// Keep track of filters
var filters = {
    country1: "",
    country2: "",
};

// default display
function init() {

    // Dropdown of country1 selection
    var country1Selector = d3.select("#selCountry1"); 
    d3.json("data/rampUpCounts1.json").then((data) => {
        var countrySelections1 = data.countries;
        console.log(countrySelections1)
        countrySelections1.forEach((country) => {
            country1Selector
            .append("option")
            .text(country)
            .property("value", country);
        });
    });

    // Dropdown of country2 selection
    var country2Selector = d3.select("#selCountry2"); 
    d3.json("data/rampUpCounts1.json").then((data) => {
        var countrySelections2 = data.countries;
        console.log(countrySelections2)
        countrySelections2.forEach((country) => {
            country2Selector
            .append("option")
            .text(country)
            .property("value", country);
        });
    });

    updateFilters();

};

// Activate default display function
init();


// function to update filters 
function updateFilters() {

    // Save the element, value, and id of the filters that were changed
    let countryFilter1 = d3.select("#selCountry1").property("value");
    let countryFilter2 = d3.select("#selCountry2").property("value");

    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object 
    if (countryFilter1 && countryFilter2) {
        filters.country1 = countryFilter1;
        filters.country2 = countryFilter2;
    } else if (countryFilter1 && !countryFilter2) {
        filters.country1 = countryFilter1;
        filters.country2 = countryFilter1;
    } else if (!countryFilter1 && countryFilter2) {
        filters.country1 = countryFilter2;
        filters.country2 = countryFilter2;
    } else if (!countryFilter1 && !countryFilter2) {
        filters.country1 = "1. Global Average";
        filters.country2 = "United States";
    }
    console.log(filters);

    // Call function to apply filter and build the line charts
    rampUpCharts();
}

// Attach an event to listen for changes to the filter
d3.selectAll("#submit-btn").on("click", updateFilters);

function rampUpCharts() {
    // Line charts: dates as x-axis, cases or deaths as y-axis
    d3.json("data/rampUpCounts1.json").then((data) => {
        console.log(data);

        var filteredData = data.counts;
        console.log(filteredData);

        // Loop through all of the filters and keep any data that
        // matches the filter values
        Object.keys(filters).forEach((key) => {
            if (key === "country1") {
                filteredData1 = filteredData.filter(country => country.country_name === filters[key]);
                console.log(filteredData1);
            }
            if (key === "country2") {
                filteredData2 = filteredData.filter(country => country.country_name === filters[key]);
                console.log(filteredData2);
            }
        });

        // Chosen countries
        // Assign counts data to variables
        var name1 = filteredData1[0].country_name;
        var minStringency1 = filteredData1[0].min_stringency;
        var maxStringency1 = filteredData1[0].max_stringency;
        var rampStart1 = filteredData1[0].ramp_start;
        var rampEnd1 = filteredData1[0].ramp_end;
        var rampLength1 = filteredData1[0].ramp_length;
        var thirtyDays1 = filteredData1[0].thirty_days;
        var sixtyDays1 = filteredData1[0].sixty_days;
        var ninetyDays1 = filteredData1[0].ninety_days;
        var oneTwentyDays1 = filteredData1[0].one_twenty_days;
        var percentPopCasesBeg1 = filteredData1[0].percent_pop_cases_beg;
        var percentPopCases301 = filteredData1[0].percent_pop_cases_30;
        var percentPopCases601 = filteredData1[0].percent_pop_cases_60;
        var percentPopCases901 = filteredData1[0].percent_pop_cases_90;
        var percentPopCases1201 = filteredData1[0].percent_pop_cases_120;
        var percentPopDeathsBeg1 = filteredData1[0].percent_pop_deaths_beg;
        var percentPopDeaths301 = filteredData1[0].percent_pop_deaths_30;
        var percentPopDeaths601 = filteredData1[0].percent_pop_deaths_60;
        var percentPopDeaths901 = filteredData1[0].percent_pop_deaths_90;
        var percentPopDeaths1201 = filteredData1[0].percent_pop_deaths_120;

        var name2 = filteredData2[0].country_name;
        var minStringency2 = filteredData2[0].min_stringency;
        var maxStringency2 = filteredData2[0].max_stringency;
        var rampStart2 = filteredData2[0].ramp_start;
        var rampEnd2 = filteredData2[0].ramp_end;
        var rampLength2 = filteredData2[0].ramp_length;
        var thirtyDays2 = filteredData2[0].thirty_days;
        var sixtyDays2 = filteredData2[0].sixty_days;
        var ninetyDays2 = filteredData2[0].ninety_days;
        var oneTwentyDays2 = filteredData2[0].one_twenty_days;
        var percentPopCasesBeg2 = filteredData2[0].percent_pop_cases_beg;
        var percentPopCases302 = filteredData2[0].percent_pop_cases_30;
        var percentPopCases602 = filteredData2[0].percent_pop_cases_60;
        var percentPopCases902 = filteredData2[0].percent_pop_cases_90;
        var percentPopCases1202 = filteredData2[0].percent_pop_cases_120;
        var percentPopDeathsBeg2 = filteredData2[0].percent_pop_deaths_beg;
        var percentPopDeaths302 = filteredData2[0].percent_pop_deaths_30;
        var percentPopDeaths602 = filteredData2[0].percent_pop_deaths_60;
        var percentPopDeaths902 = filteredData2[0].percent_pop_deaths_90;
        var percentPopDeaths1202 = filteredData2[0].percent_pop_deaths_120;
        
        // Set the x & y axis for ramp up
        var xAxisStringency1 = rampStart1.concat(rampEnd1);
        var xAxisStringency2 = rampStart2.concat(rampEnd2);
        var yAxisStringency1 = minStringency1.concat(maxStringency1); 
        var yAxisStringency2 = minStringency2.concat(maxStringency2);      
        
        // Set the x & y axis for total cases
        var xAxisCases1 = rampStart1.concat(thirtyDays1, sixtyDays1, ninetyDays1, oneTwentyDays1);
        var xAxisCases2 = rampStart2.concat(thirtyDays2, sixtyDays2, ninetyDays2, oneTwentyDays2);
        var yAxisCases1 = percentPopCasesBeg1.concat(percentPopCases301, percentPopCases601, percentPopCases901, percentPopCases1201);
        var yAxisCases2 = percentPopCasesBeg2.concat(percentPopCases302, percentPopCases602, percentPopCases902, percentPopCases1202);
        
        // Set the x & y axis for total deaths
        var xAxisDeaths1 = rampStart1.concat(thirtyDays1, sixtyDays1, ninetyDays1, oneTwentyDays1);
        var xAxisDeaths2 = rampStart2.concat(thirtyDays2, sixtyDays2, ninetyDays2, oneTwentyDays2);
        var yAxisDeaths1 = percentPopDeathsBeg1.concat(percentPopDeaths301, percentPopDeaths601, percentPopDeaths901, percentPopDeaths1201);
        var yAxisDeaths2 = percentPopDeathsBeg2.concat(percentPopDeaths302, percentPopDeaths602, percentPopDeaths902, percentPopDeaths1202);

        // Total Cases Chart
        var rampUp_country1 = {
            x: xAxisStringency1,
            y: yAxisStringency1,
            name: name1 + " - Ramp Up",
            fill: 'tonexty',
            type: "scatter",
            line: {
                color: "rgb(178,28,43)"
            }
        };
        var rampUp_country2 = {
            x: xAxisStringency2,
            y: yAxisStringency2,
            name: name2 + " - Ramp Up",
            fill: 'tonexty',
            yaxis: 'y2',
            type: "scatter",
            line: {
                color: "rgb(67,147,195)"
            }
        };
        var totCases_country1 = {
            x: xAxisCases1,
            y: yAxisCases1,
            name: name1 + " - Total Cases",
            yaxis: 'y3',
            type: "scatter",
            line: {
                color: "rgb(178,28,43)"
            }
        };
        var totCases_country2 = {
            x: xAxisCases2,
            y: yAxisCases2,
            name: name2 + " - Total Cases",
            yaxis: 'y4',
            type: "scatter",
            line: {
                color: "rgb(67,147,195)"
            }
        };
        var countryData_totCases1 = [totCases_country2, totCases_country1, rampUp_country2, rampUp_country1];

        var layoutChart_totCases1 = {
            title: "Ramp Up with Total Cases",
            showlegend: true,
            legend: {
                x: 0.1,
                y: -0.6
            },
            titlefont: {
                size: 25
            },
            xaxis: {
                showgrid: false,
                tickcolor: "#FFFFFF",
            },
            yaxis: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                range: [0,100],
                title: {
                    text: "Stringency Index",
                    font: {
                        size: 20
                    }
                }
            },
            yaxis2: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                range: [0,100],
                side: "left",
                overlaying: 'y',
                anchor: 'free'
            },
            yaxis3: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                side: "right",
                overlaying: 'y',
                range: [0,5],
                title: {
                    text: "% of Population",
                    font: {
                        size: 20
                    }
                },
                anchor: 'x'
            },
            yaxis4: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                side: "right",
                anchor: 'x',
                range: [0,5],
                overlaying: 'y',
            },
            width: 525,
            height: 425,
            plot_bgcolor: "rgba(0, 0, 0, 0)",
            paper_bgcolor: "rgba(0, 0, 0, 0)",
            font: {
                color: '#FFFFFF'
            }
        };
        
        Plotly.newPlot("rampUpCases", countryData_totCases1, layoutChart_totCases1,{displayModeBar: false});
        
        // Total Deaths Chart
        var rampUp_country1 = {
            x: xAxisStringency1,
            y: yAxisStringency1,
            name: name1 + " - Ramp Up",
            fill: 'tonexty',
            type: "scatter",
            line: {
                color: "rgb(178,28,43)"
            }
        };
        var rampUp_country2 = {
            x: xAxisStringency2,
            y: yAxisStringency2,
            name: name2 + " - Ramp Up",
            fill: 'tonexty',
            yaxis: 'y2',
            type: "scatter",
            line: {
                color: "rgb(67,147,195)"
            }
        };
        var totDeaths_country1 = {
            x: xAxisDeaths1,
            y: yAxisDeaths1,
            name: name1 + " - Total Deaths",
            yaxis: 'y3',
            type: "scatter",
            line: {
                color: "rgb(178,28,43)"
            }
        };
        var totDeaths_country2 = {
            x: xAxisDeaths2,
            y: yAxisDeaths2,
            name: name2 + " - Total Deaths",
            yaxis: 'y4',
            type: "scatter",
            line: {
                color: "rgb(67,147,195)"
            }
        };
        var countryData_totDeaths1 = [totDeaths_country2, totDeaths_country1, rampUp_country2, rampUp_country1];

        var layoutChart_totDeaths1 = {
            title: "Ramp Up with Total Deaths",
            showlegend: true,
            legend: {
                x: 0.1,
                y: -0.6
            },
            titlefont: {
                size: 25
            },
            xaxis: {
                showgrid: false,
                tickcolor: "#FFFFFF",
            },
            yaxis: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                range: [0,100],
                title: {
                    text: "Stringency Index",
                    font: {
                        size: 20
                    }
                }
            },
            yaxis2: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                range: [0,100],
                side: "left",
                overlaying: 'y',
                anchor: 'free'
            },
            yaxis3: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                side: "right",
                overlaying: 'y',
                range: [0,0.09],
                title: {
                    text: "% of Population",
                    font: {
                        size: 20
                    }
                },
                anchor: 'x'
            },
            yaxis4: {
                showline: true,
                showgrid: false,
                tickcolor: "#FFFFFF",
                side: "right",
                anchor: 'x',
                range: [0,0.09],
                overlaying: 'y',
            },
            width: 525,
            height: 425,
            plot_bgcolor: "rgba(0, 0, 0, 0)",
            paper_bgcolor: "rgba(0, 0, 0, 0)",
            font: {
                color: '#FFFFFF'
            }
        };
        Plotly.newPlot("rampUpDeaths", countryData_totDeaths1, layoutChart_totDeaths1,{displayModeBar: false});
    });
}