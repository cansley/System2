/**
 * Created by Charles on 1/17/2015.
 */
(function(){
    'use strict';
    var system2 = angular.module("system2",[]);

    system2.filter('percentage', ['$filter', function($filter){
        return function(input, decimals){
            return $filter('number')(input * 100, decimals) + '%';
        };
    }]);

    system2.directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsText(changeEvent.target.files[0]);
                });
            }
        }
    }]);

    system2.directive("xyChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='xychart{{grade}}' ng-show='showChart' ng-style='{{getXyChartStyle(grade)}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'xychart' + chartGrade;

                // XY Chart
                if(typeof chart === 'undefined' || chart === null){
                    var chart = [];
                }


                scope.$watch('xyChartStyles', function (val) {
                    console.log("xyChartStyles Changed...");
                    if (scope.xychartData == undefined || scope.xychartData == null) return;
                    if (chart[chartGrade] === undefined)  return;
                    console.log('redrawing ' + chartName + '...');
                    chart[chartGrade].write(chartName);
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                }, true);

                scope.$watch('xychartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    chart[chartGrade] = new AmCharts.AmXYChart();
                    chart[chartGrade].pathToImages = "/amcharts/images/";
                    chart[chartGrade].startDuration = 0;
                    chart[chartGrade].autoMargins = false;
                    chart[chartGrade].marginLeft = 60;
                    chart[chartGrade].marginBottom = 60;
                    chart[chartGrade].dataProvider = val[chartGrade];
                    // AXES
                    // X
                    var xAxis = new AmCharts.ValueAxis();
                    xAxis.title = "Assessment 2";
                    xAxis.position = "bottom";
                    xAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(xAxis);

                    // Y
                    var yAxis = new AmCharts.ValueAxis();
                    yAxis.title = "Growth";
                    yAxis.position = "left";
                    yAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(yAxis);


                    // GRAPH
                    var greenGraph = new AmCharts.AmGraph();
                    greenGraph.xField = "x";
                    greenGraph.xAxis = "x";
                    greenGraph.yField = "y";
                    greenGraph.lineAlpha = 0;
                    greenGraph.lineColor = '#B1D62B';
                    greenGraph.bulletField = 'bullet';
                    greenGraph.bulletSize = scope.bulletSize;
                    greenGraph.valueAxis="Not set";
                    greenGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value]]</b>";
                    chart[chartGrade].addGraph(greenGraph);

                    var redGraph = new AmCharts.AmGraph();
                    redGraph.xField = "x2";
                    redGraph.yField = "y2";
                    redGraph.lineAlpha = 0;
                    redGraph.lineColor = '#ff0000';
                    redGraph.bulletField = 'bullet2';
                    redGraph.bulletSize = scope.bulletSize;
                    redGraph.valueAxis="Not set";
                    redGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart[chartGrade].addGraph(redGraph);

                    var blueGraph = new AmCharts.AmGraph();
                    blueGraph.xField = "x3";
                    blueGraph.yField = "y3";
                    blueGraph.lineColor = '#0000ff';
                    blueGraph.bulletField = 'bullet3';
                    blueGraph.bulletSize = 1;
                    blueGraph.valueAxis="Not set";
                    blueGraph.showBalloon = false;
                    chart[chartGrade].addGraph(blueGraph);

                    chart[chartGrade].write(chartName);
                    chart[chartGrade].validateData();

                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("printXyChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='printxychart{{grade}}' ng-show='showChart' ng-style='{{printChart}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'printxychart' + chartGrade;

                // XY Chart
                if(typeof chart === 'undefined' || chart === null){
                    var chart = [];
                }

                scope.$watch('xychartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    chart[chartGrade] = new AmCharts.AmXYChart();
                    chart[chartGrade].pathToImages = "/amcharts/images/";
                    chart[chartGrade].startDuration = 0;
                    chart[chartGrade].autoMargins = false;
                    chart[chartGrade].marginLeft = 60;
                    chart[chartGrade].marginBottom = 60;
                    chart[chartGrade].dataProvider = val[chartGrade];
                    // AXES
                    // X
                    var xAxis = new AmCharts.ValueAxis();
                    xAxis.title = "Assessment 2";
                    xAxis.position = "bottom";
                    xAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(xAxis);

                    // Y
                    var yAxis = new AmCharts.ValueAxis();
                    yAxis.title = "Growth";
                    yAxis.position = "left";
                    yAxis.autoGridCount = true;
                    chart[chartGrade].addValueAxis(yAxis);


                    // GRAPH
                    var greenGraph = new AmCharts.AmGraph();
                    greenGraph.xField = "x";
                    greenGraph.xAxis = "x";
                    greenGraph.yField = "y";
                    greenGraph.lineAlpha = 0;
                    greenGraph.lineColor = '#B1D62B';
                    greenGraph.bulletField = 'bullet';
                    greenGraph.bulletSize = scope.bulletSize;
                    greenGraph.valueAxis="Not set";
                    greenGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value]]</b>";
                    chart[chartGrade].addGraph(greenGraph);

                    var redGraph = new AmCharts.AmGraph();
                    redGraph.xField = "x2";
                    redGraph.yField = "y2";
                    redGraph.lineAlpha = 0;
                    redGraph.lineColor = '#ff0000';
                    redGraph.bulletField = 'bullet2';
                    redGraph.bulletSize = scope.bulletSize;
                    redGraph.valueAxis="Not set";
                    redGraph.balloonText = "Assessment 2:<b>[[x]]</b> Growth:<b>[[y]]</b><br>Student:<b>[[value2]]</b>";
                    chart[chartGrade].addGraph(redGraph);

                    var blueGraph = new AmCharts.AmGraph();
                    blueGraph.xField = "x3";
                    blueGraph.yField = "y3";
                    blueGraph.lineColor = '#0000ff';
                    blueGraph.bulletField = 'bullet3';
                    blueGraph.bulletSize = 1;
                    blueGraph.valueAxis="Not set";
                    blueGraph.showBalloon = false;
                    chart[chartGrade].addGraph(blueGraph);

                    chart[chartGrade].write(chartName);
                    chart[chartGrade].validateData();

                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ chart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("lineChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='linechart{{grade}}' ng-show='showChart' ng-style='{{getLineChartStyle(grade)}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'linechart' + chartGrade;

                // XY Chart
                if(typeof lineChart === 'undefined' || lineChart === null){
                    var lineChart = [];
                }

                scope.$watch('lineChartStyles', function(val){
                    if(scope.linechartData == undefined || scope.linechartData == null) return;
                    if(lineChart[chartGrade] === undefined)return;
                    console.log('redrawing ' + chartName + '...');
                    lineChart[chartGrade].write(chartName);
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                }, true);

                scope.$watch('linechartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    lineChart[chartGrade] = new AmCharts.AmSerialChart();
                    var wc = lineChart[chartGrade];

                    wc.pathToImages = "/amcharts/images/";
                    wc.startDuration = 0;
                    wc.autoMargins = false;
                    wc.autoMarginOffset = 40;
                    wc.marginBottom = 100;
                    wc.marginLeft = 60;
                    wc.marginRight = 60;
                    wc.dataProvider = val[chartGrade];
                    // AXES
                    // Category
                    var category = wc.categoryAxis;
                    category.autoRotateAngle = 0;
                    category.labelRotation = 90;
                    //category.labelOffset = 60;
                    wc.categoryField = "student";

                    var scoreAxis = new AmCharts.ValueAxis();
                    scoreAxis.title = "Score";
                    scoreAxis.position = "left";
                    scoreAxis.id = "aScore";
                    wc.addValueAxis(scoreAxis);

                    // growth
                    var growthAxis = new AmCharts.ValueAxis();
                    growthAxis.title = "Growth";
                    growthAxis.position = "right";
                    growthAxis.id = "aGrowth";
                    wc.addValueAxis(growthAxis);

                    // logarithmic trend
                    //var tLog = new AmCharts.ValueAxis();
                    //tLog.id = "aLog";
                    //tLog.position = "right";
                    //wc.addValueAxis(tLog);


                    // GRAPHS
                    var gScore = new AmCharts.AmGraph();
                    gScore.columnWidth = 1;
                    gScore.cornerRadiusTop = 8;
                    gScore.dashLength = 4;
                    gScore.fillAlphas = 1;
                    gScore.id = "gScore";
                    gScore.lineAlpha = 1;
                    gScore.type = "column";
                    gScore.valueField = "score";
                    wc.addGraph(gScore);

                    var gGrowth = new AmCharts.AmGraph();
                    gGrowth.bullet = "square";
                    gGrowth.bulletSize = 5;
                    gGrowth.id = "gGrowth";
                    gGrowth.title = "Growth";
                    gGrowth.valueAxis = "aGrowth";
                    gGrowth.valueField = "growth";
                    wc.addGraph(gGrowth);

                    //var gTrend = new AmCharts.AmGraph();
                    //gTrend.bullet = "round";
                    //gTrend.id = "gTrend";
                    //gTrend.title = "";
                    //gTrend.valueAxis = "aLog";
                    //gTrend.valueField = "trend";
                    //wc.addGraph(gTrend);



                    lineChart[chartGrade].validateData();
                    lineChart[chartGrade].write(chartName);
                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("printLineChart", function(){
        return {
            restrict: "E",
            transclude: true,
            template: "<div id='printLinechart{{grade}}' ng-show='showChart' ng-style='{{printChart}}'></div>",
            link: function(scope, element, attrs){
                var chartGrade = attrs['grade'];
                var chartName = 'printLinechart' + chartGrade;

                // XY Chart
                if(typeof lineChart === 'undefined' || lineChart === null){
                    var lineChart = [];
                }

                scope.$watch('linechartData', function(val){
                    if(val== undefined || val == null) return;
                    console.log('updating Chart data for ' + chartName);
                    lineChart[chartGrade] = new AmCharts.AmSerialChart();
                    var wc = lineChart[chartGrade];

                    wc.pathToImages = "/amcharts/images/";
                    wc.startDuration = 0;
                    wc.autoMargins = false;
                    wc.autoMarginOffset = 40;
                    wc.marginBottom = 100;
                    wc.marginLeft = 60;
                    wc.marginRight = 60;
                    wc.dataProvider = val[chartGrade];
                    // AXES
                    // Category
                    var category = wc.categoryAxis;
                    category.autoRotateAngle = 0;
                    category.labelRotation = 90;
                    //category.labelOffset = 60;
                    wc.categoryField = "student";

                    var scoreAxis = new AmCharts.ValueAxis();
                    scoreAxis.title = "Score";
                    scoreAxis.position = "left";
                    scoreAxis.id = "aScore";
                    wc.addValueAxis(scoreAxis);

                    // growth
                    var growthAxis = new AmCharts.ValueAxis();
                    growthAxis.title = "Growth";
                    growthAxis.position = "right";
                    growthAxis.id = "aGrowth";
                    wc.addValueAxis(growthAxis);

                    // logarithmic trend
                    //var tLog = new AmCharts.ValueAxis();
                    //tLog.id = "aLog";
                    //tLog.position = "right";
                    //wc.addValueAxis(tLog);


                    // GRAPHS
                    var gScore = new AmCharts.AmGraph();
                    gScore.columnWidth = 1;
                    gScore.cornerRadiusTop = 8;
                    gScore.dashLength = 4;
                    gScore.fillAlphas = 1;
                    gScore.id = "gScore";
                    gScore.lineAlpha = 1;
                    gScore.type = "column";
                    gScore.valueField = "score";
                    wc.addGraph(gScore);

                    var gGrowth = new AmCharts.AmGraph();
                    gGrowth.bullet = "square";
                    gGrowth.bulletSize = 5;
                    gGrowth.id = "gGrowth";
                    gGrowth.title = "Growth";
                    gGrowth.valueAxis = "aGrowth";
                    gGrowth.valueField = "growth";
                    wc.addGraph(gGrowth);

                    //var gTrend = new AmCharts.AmGraph();
                    //gTrend.bullet = "round";
                    //gTrend.id = "gTrend";
                    //gTrend.title = "";
                    //gTrend.valueAxis = "aLog";
                    //gTrend.valueField = "trend";
                    //wc.addGraph(gTrend);



                    lineChart[chartGrade].validateData();
                    lineChart[chartGrade].write(chartName);
                    // check me out, too fast for AmCharts!
                    setTimeout(function(){ lineChart[chartGrade].validateNow(); }, 10);
                });
            }
        };
    });

    system2.directive("datasummary", function(){
        return{
            restrict: "E",
            transclude: true,
            link: function(scope, element, attrs){
                var grade = attrs['grade'];
                var avg = [];
                var median = [];
                var min = [];
                var max = [];
                var stdDev = [];
                var breakDowns = ['score1', 'score2', 'growth'];

                scope.$watch('studentsUpdated', function(val){
                    if(val=== undefined){ return;}

                    var StudentData = scope.GetStudentData();
                    avg["score1"] = StudentData.AverageScore1(grade).toFixed(2);
                    avg["score2"] = StudentData.AverageScore2(grade).toFixed(2);
                    avg["growth"] = StudentData.AverageGrowth(grade).toFixed(2);

                    var minMax = StudentData.MinMaxGrowth(grade);
                    min["growth"] = minMax[0];
                    max["growth"] = minMax[1];

                    minMax = StudentData.MinMaxScore1(grade);
                    min["score1"] = minMax[0];
                    max["score1"] = minMax[1];

                    minMax = StudentData.MinMaxScore2(grade);
                    min["score2"] = minMax[0];
                    max["score2"] = minMax[1];

                    stdDev["growth"] = StudentData.GrowthStandardDev(grade).toFixed(2);
                    stdDev["score1"] = StudentData.Score1StandardDev(grade).toFixed(2);
                    stdDev["score2"] = StudentData.Score2StandardDev(grade).toFixed(2);

                    median["growth"] = ((min["growth"]+max["growth"])/2).toFixed(2);
                    median["score1"] = ((min["score1"]+max["score1"])/2).toFixed(2);
                    median["score2"] = ((min["score2"]+max["score2"])/2).toFixed(2);

                    var tableHtml = "<table class='table'>";
                    tableHtml += "<tr><td>&nbsp;</td><td>Assessment 1</td><td>Assessment 2</td><td>Growth</td></tr>";
                    tableHtml += "<tr><td>Mean</td><td>" + avg["score1"] + "</td><td>" + avg["score2"] + "</td><td>" + avg["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Median</td><td>" + median["score1"] + "</td><td>" + median["score2"] + "</td><td>" + median["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Minimum</td><td>" + min["score1"] + "</td><td>" + min["score2"] + "</td><td>" + min["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Maximum</td><td>" + max["score1"] + "</td><td>" + max["score2"] + "</td><td>" + max["growth"] + "</td></tr>";
                    tableHtml += "<tr><td>Standard Deviation</td><td>" + stdDev["score1"] + "</td><td>" + stdDev["score2"] + "</td><td>" + stdDev["growth"] + "</td></tr>";
                    tableHtml += "</table>";

                    var tableElement = angular.element(tableHtml);
                    element.append(tableElement);
                }, true);
            }
        };

    });

    system2.factory('Student', function(){
        function Student(name, grade, score1, score2){
            this.name =name;
            this.grade=grade;
            this.score1 = score1;
            this.score2 = score2;
            this.growth = function(){
                if(typeof(this.score1) !== "number" || typeof(this.score2) !== "number"){
                    return '';
                } else{
                    return this.score2 - this.score1;
                }};
            this.percentGrowth = function(){
                if(!this.score1 || !this.score2){
                    return '';
                } else {
                    return this.growth() / this.score2;
                }
            };
        };

        return (Student);
    });

    system2.factory("StudentData", function($rootScope, ArrayMath){
        var studentData = {};
        studentData.Data = [];

        studentData.Grades = function(){
            var n = {},r=[];
            for(var i = 0; i < studentData.Data.length; i++)
            {
                if (!n[studentData.Data[i].grade])
                {
                    n[studentData.Data[i].grade] = true;
                    r.push(studentData.Data[i].grade);
                }
            }
            return r;
        }

        studentData.DataByGrade = function(grade){
            if(typeof grade === 'undefined' || grade === null){
                return studentData.Data;
            }

            grade = Number(grade);
            return studentData.Data.filter(function(student){
                if(student.grade === grade){
                    return true;
                }
            });
        }

        studentData.Growths = function(grade){
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.growth();
            });
        }

        studentData.Score2s = function (grade) {
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.score2;
            });
        }

        studentData.Score1s = function (grade) {
            var data = studentData.DataByGrade(grade);
            return data.map(function (student) {
                return student.score1;
            });
        }

        studentData.UpdateStudentData = function (value){
            studentData.Data = value;
            $rootScope.$broadcast('studentDataUpdated');
        }

        studentData.AddStudent = function(student){
            studentData.Data.push(student);
            $rootScope.$broadcast('studentDataUpdated');
        }

        studentData.AverageGrowth = function(grade){
            return ArrayMath.Average(this.Growths(grade));
        }

        studentData.AverageScore1 = function(grade){
            return ArrayMath.Average(this.Score1s(grade));
        }

        studentData.AverageScore2 = function(grade){
            return ArrayMath.Average(this.Score2s(grade));
        }

        studentData.MinMaxGrowth = function(grade){
            var min = ArrayMath.Min(this.Growths(grade));
            var max = ArrayMath.Max(this.Growths(grade));
            return [min,max];
        }

        studentData.MinMaxScore1 = function(grade){
            var min = ArrayMath.Min(this.Score1s(grade));
            var max = ArrayMath.Max(this.Score1s(grade));
            return [min,max];
        }

        studentData.MinMaxScore2 = function(grade){
            var min = ArrayMath.Min(this.Score2s(grade));
            var max = ArrayMath.Max(this.Score2s(grade));
            return [min,max];
        }

        studentData.GrowthStandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Growths(grade));
        }

        studentData.Score1StandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Score1s(grade));
        }

        studentData.Score2StandardDev = function(grade){
            return ArrayMath.StandardDeviation(this.Score2s(grade));
        }

        studentData.WithinStandardDevPlotpoints = function (grade) {
            var topScore = this.AverageScore2(grade) + this.Score2StandardDev(grade);
            var bottomScore = this.AverageScore2(grade) - this.Score2StandardDev(grade);
            var topGrowth = this.AverageGrowth(grade) + this.GrowthStandardDev(grade);
            var bottomGrowth = this.AverageGrowth(grade) - this.GrowthStandardDev(grade);
            var filteredList = studentData.DataByGrade(grade).filter(function(student){
                if((bottomScore <= student.score2 && student.score2 <= topScore) &&
                    (bottomGrowth <= student.growth() && student.growth() <= topGrowth)){
                    return true;
                }
            });
            return filteredList.map(function(student){
                return [student.score2, student.growth(), student.name]
            });
        }

        studentData.WithoutStandardDevPlotpoints = function (grade) {
            var topScore = this.AverageScore2(grade) + this.Score2StandardDev(grade);
            var bottomScore = this.AverageScore2(grade) - this.Score2StandardDev(grade);
            var topGrowth = this.AverageGrowth(grade) + this.GrowthStandardDev(grade);
            var bottomGrowth = this.AverageGrowth(grade) - this.GrowthStandardDev(grade);

            var filteredList = studentData.DataByGrade(grade).filter(function(student){
                if((student.score2 < bottomScore || student.score2 > topScore) ||
                    (student.growth() < bottomGrowth || student.growth() > topGrowth)){
                    return true;
                }
            });

            return filteredList.map(function(student){
                return [student.score2, student.growth(), student.name]
            });
        }

        studentData.Plotpoints = function(grade){
            return studentData.DataByGrade(grade).map(function(student){
                return [student.score2, student.growth(), student.name];
            });
        }

        studentData.TrendLinePoints = function(grade){
            var reg = regression('polynomial', this.Plotpoints(grade), 3);
            return reg.points;
        }

        return studentData;
    });

    system2.factory("ArrayMath", function(){
        var m = {};

        m.Min = function(values){
            return Math.min.apply(Math, values);
        };

        m.Max = function(values){
            return Math.max.apply(Math, values);
        };

        m.StandardDeviation = function(values){
            var avg = this.Average(values);

            var squareDiffs = values.map(function(value){
                var diff = value - avg;
                var sqrDiff = diff * diff;
                return sqrDiff;
            });

            var avgSquareDiff = this.Average(squareDiffs);

            var stdDev = Math.sqrt(avgSquareDiff);
            return stdDev;
        };

        m.Average = function(data){
            var sum = data.reduce(function(sum, value){
                return sum + value;
            }, 0);

            var avg = sum / data.length;
            return avg;
        };

        return m;
    });

    system2.controller("sys2Ctrl", function($compile, $scope, $http, Student, StudentData){
        var app = this;
        console.log('init controller...');
        $scope.students = [];
        //$scope.grades = [];
        $scope.bulletSize = 10;
        $scope.xyChartStyles = [];
        $scope.lineChartStyles = [];
        $scope.showForm = false;
        $scope.showChart = false;
        $scope.showFile = true;
        $scope.showChoice = true;
        $scope.showSuccess = false;
        $scope.studentsUpdated;

        $scope.smallChart = {"width": "360px", "height": "280px"};
        $scope.largeChart = {"width": "800px", "height": "600px"};
        $scope.printChart = {"width": "1000px", "height": "600px"};

        $scope.GetStudentData = function(){ return StudentData; };

        $scope.$on('studentDataUpdated', function(){
            $scope.students = StudentData.Data;
            $scope.grades = StudentData.Grades();
        });

        // start by loading up some empty students
        for(var x = 0;x<5;x++){
            StudentData.AddStudent(new Student('Student '+ x));
        }

        $scope.loadStudents = function(element){
            // read the file from the browser and populate students.
            var file = element.files[0];
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
                var contents =loadEvent.target.result.split('\n');
                StudentData.UpdateStudentData([]);
                for(var i in contents){
                    var content = contents[i].replace(/'/g, "").replace(/"/g, '');
                    var arr = content.split(',');
                    if(arr.length > 1) {
                        var student = new Student(arr.slice(0, -3).join(), Number(arr[arr.length-3]), Number(arr[arr.length-2]), Number(arr[arr.length-1]));
                        StudentData.AddStudent(student);

                    }
                }

                $scope.showForm=true;
                $scope.showSuccess =true;
                $scope.showChoice=false;
                $scope.showFile = false;
                $scope.$apply();
                $('#one').addClass('numberCircleDone');
                $('#two').addClass('numberCircleSelected');
                $('#directionText').hide();
                $('#fixedButton').show();

            };
            reader.readAsText(file);
        };

        $scope.addStudent = function(){
            StudentData.AddStudent(new Student());
        };

        $scope.showInputForm = function(){
            $scope.showForm=true;
            $scope.showChoice = false;
            $('#directionText').html('Enter Student Test Data | <a style="font-size: 12px;"  href="javascript:history.go(0)"> Go Back, and upload a CSV File </a>')
            $('#fixedButton').show();
        };
        $scope.processStudents = function() {
            $scope.$broadcast('studentDataUpdated');
            $scope.xychartData = [];
            $scope.linechartData = [];
            console.log("processing students...");
            StudentData.Grades().forEach(function(value, idx, arr){
                var targetGrade = value;
                var greenPoints = StudentData.WithinStandardDevPlotpoints(targetGrade);
                var redPoints = StudentData.WithoutStandardDevPlotpoints(targetGrade);
                var bluePoints = StudentData.TrendLinePoints(targetGrade).sort(function (a, b) {
                    return a[0] - b[0]
                });
                var newChartData = [];
                var defaultx = StudentData.AverageScore2(targetGrade);
                var defaulty = StudentData.AverageGrowth(targetGrade);

                var x = greenPoints.length;
                if (redPoints.length > x) {
                    x = redPoints.length;
                }

                if (bluePoints.length > x) {
                    x = bluePoints.length;
                }

                for (var i = 0; i < x; i++) {
                    var dataObj = {};
                    if (i < greenPoints.length) {
                        dataObj.x = greenPoints[i][0];
                        dataObj.y = greenPoints[i][1];
                        dataObj.value = greenPoints[i][2];
                        dataObj.bullet = "round";
                    } else {
                        dataObj.x = defaultx;
                        dataObj.y = defaulty;
                        dataObj.value = 'Average';
                        dataObj.bullet = null;
                    }

                    if (i < redPoints.length) {
                        dataObj.x2 = redPoints[i][0];
                        dataObj.y2 = redPoints[i][1];
                        dataObj.value2 = redPoints[i][2];
                        dataObj.bullet2 = "round";
                    } else {
                        dataObj.x2 = defaultx;
                        dataObj.y2 = defaulty;
                        dataObj.value = 'Average';
                    }

                    if (i < bluePoints.length) {
                        dataObj.x3 = bluePoints[i][0];
                        dataObj.y3 = bluePoints[i][1];
                        dataObj.bullet3 = "round";
                    }

                    newChartData.push(dataObj);
                }

                $scope.xychartData[targetGrade] = newChartData;

                // build the line chart data;
                var newLineData = [];
                StudentData.Plotpoints(targetGrade).sort(function(a,b){return a[0]-b[0]}).forEach(function(value, idx, arr){
                    var obj = {};
                    obj.student = value[2];
                    obj.score = value[0];
                    obj.growth = value[1];
                    obj.trend = value[0]; // dummy placeholder for now.
                    newLineData.push(obj);
                });

                $scope.linechartData[targetGrade] = newLineData;
            });

            StudentData.Grades().forEach(function(value, idx, arr) {
                var targetGrade = value;
                $scope.xyChartStyles[targetGrade] = $scope.smallChart;
                $scope.lineChartStyles[targetGrade] = $scope.smallChart;
            });


            $('#one').addClass('numberCircleDone');
            $('#two').addClass('numberCircleDone');
            $('#three').addClass('numberCircleSelected');
            $('#directionText').hide();
            $('#fixedButton').hide();
            console.log('updating students');
            $scope.studentsUpdated = Date.now();
        };

        $scope.getXyChartStyle = function(grade){
            var style = $scope.xyChartStyles[grade];
            if(style === undefined) return $scope.smallChart;
            return style;
        };

        $scope.getLineChartStyle = function(grade){
            var style = $scope.lineChartStyles[grade];
           if(style === undefined) return $scope.smallChart;
            return style;
        };

        $scope.showLargeChart = function(chartType, grade){
            $scope.bulletSize = 10;
            if(chartType === "lineChart"){
                var targetDiv = $('#linechart' + grade)[0];
                var chartStyles = $scope.lineChartStyles;
            }

            if(chartType === "xyChart"){
                var targetDiv = $('#xychart' + grade)[0];
                var chartStyles = $scope.xyChartStyles;
            }

            targetDiv.setAttribute("style", "width: 800px; height: 600px; overflow: hidden; text-align: left;");
            chartStyles[grade] = $scope.largeChart;
        };


        $scope.showSmallChart = function(chartType, grade){
            $scope.bulletSize = 1;
            if(chartType === "lineChart"){
                var targetDiv = $('#linechart' + grade)[0];
               targetDiv.setAttribute("style", "width: 360px; height: 280px; overflow: hidden; text-align: left;");
                $scope.lineChartStyles[grade] = $scope.smallChart;
            }

            if(chartType === "xyChart"){


                var targetDiv = $('#xychart' + grade)[0];
               targetDiv.setAttribute("style", "width: 360px; height: 280px; overflow: hidden; text-align: left;");
               $scope.xyChartStyles[grade] = $scope.smallChart;
            }
        }

        $scope.saveGradeToPdf = function(grade){
            console.log("saving pdf...");
            $('#printChartDiv' + grade)[0].setAttribute('style', '');
            AmCharts.charts.forEach(function(chart, idx,arr){
                chart.validateNow();
            });
            $('#printChartDiv' + grade)[0].setAttribute('style', 'display:none;');
            var printDivName = "#printDiv" + grade + ' datasummary';
            var svgCollSelector = "#printDiv" + grade + " svg";
            var svgColl = $(svgCollSelector);
            var chartData = [];
            var images = [];

            for(var x=0; x<svgColl.length;x++){
                var svg = svgColl[x];
                var svgData = new XMLSerializer().serializeToString(svg);

                images[x] = new Image();
                images[x].width = 1000;
                images[x].height = 600;
                images[x].src = "data:image/svg+xml;base64," + btoa(svgData);

                images[x].onload = function(){
                    var img = this;
                    $('#holder')[0].appendChild(img);
                    setTimeout(function(){
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                        //$('#printDiv'+grade)[0].appendChild(canvas);
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img,0,0);
                        chartData.push(canvas.toDataURL("image/png"));

                        if(chartData.length == 2){
                            var pdf = new jsPDF('l', 'pt', 'letter');
                            var source = $(printDivName).first()[0];
                            pdf.fromHTML(source, 20, 20,{'width': 10});
                            for(var x=0;x<chartData.length;x++){
                                pdf.addPage();
                                pdf.addImage(chartData[x], 'png', 15, 20);
                            }

                            pdf.save('Grade ' + grade + ' Analysis.pdf');
                            $('#holder')[0].innerHTML = "";
                            $('#printChartDiv' + grade)[0].hide();
                        }
                    }, 100);



                };
            }
        }

        $scope.putChartInModal = function(num, type){

            var chartSelector;
            if(type==="lineChart"){
                chartSelector = '#linechart' + num;
            }

            if( type === "xyChart"){
                chartSelector = '#xychart' + num;
            }



            var targetChart = $(chartSelector);
            targetChart[0].setAttribute("style", "width: 800px; height: 600px; overflow: hidden; text-align: left;");
            $(chartSelector).hide();//hiding stuff...
            setTimeout(function() {
                //wait to put it in its happy place...

                //wrap chart svg in to modal body //$('#linechart' + grade)[0]
                targetChart.wrap('<div class="modal-body" > </div>' );
                //wrap modal body in greater modal
                $('.modal-body').wrap('<div id="chartModal" class="modal  fade" tabindex="-1" data-width="760"> </div>');
                //add close button and header
                $( '<div class="modal-header"><button ng-click="putChartBack('+num+',\''+ type +'\')" type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h3>Assessment Chart</h3></div>' ).prependTo( "#chartModal" );

                //var parentModal = angular.element('<div id="chartModal" class="modal  fade" tabindex="-1" data-width="760"> </div>');
                //parentModal.app


                //place things in the correct location in DOM
                var item = $('#chartModal');  // item to move
                var want = $('.mainpanel');  // container to receive it
                item.remove();
                want.append($compile(item)($scope));

                //show chart
                $(chartSelector).show();
                $('#chartModal').modal('show');


            }, 50);




            setTimeout($scope.showLargeChart(type, num), 500);





        };


        $('#cancelButton').click(function() {
            location.reload();
        });



        $(document).on('click', 'a.delete-row', function () { //
            //alert("aa");
            $(this).closest('tr').remove();
            return false;
        });






        $scope.putChartBack = function(grade, type){

            //closeChart

            var getHTML = $('.modal-body').html()


            //remove svg from modal

            $('.modal-body ').remove();

            //add to DOM again!!!!
            var chartTypeSelector;
            var chartSelector;
            if (type === "xyChart"){
                chartTypeSelector = 'xy-chart[grade="' + grade + '"]';
                chartSelector = '#xychart' + grade;
            }
            if(type === "lineChart"){
                chartTypeSelector = 'line-chart[grade="' + grade + '"]';
                chartSelector = '#linechart' + grade;
            }
            var targetDiv = $(chartTypeSelector)[0];
            targetDiv.innerHTML = getHTML;
            $('#chartModal').remove();
            $('.modal-backdrop').remove();
            $scope.showSmallChart(type, grade);
        }
    });
})();



