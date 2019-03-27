angular.module('starter.echart', [])
    .directive('echart',
        function ($rootScope,BranchDataProvider) {
            return {
                restrict: 'EA',
                template: '<div ></div>',
                replace: true,
                scope: {
                    data: "=",
                    call: "&" //调用外部实现函数
                },
                link: function (scope, element, attrs) {
                    console.log('3242424');
                    var dom = element[0],
                        ndParent = element.parent()[0],
                        parentWidth, parentHeight,
                        width, height, chart;
                    var canResize = false;
                    function setOptions(params) {
                        console.log('3223');
                        if (scope.data) {
                            getSize();
                            if (chart) {
                                chart.clear();
                            }else {
                                chart = echarts.init(dom);
                                canResize = true;
                            }
                            var options = BranchDataProvider.branchData();
                            chart.setOption(options);
                        }
                    }
                    setOptions('');
                    var watchDate=scope.$watch(function () {return $rootScope.parentData}, function (value) {
                        
                        console.log("link内部----我接收到了改变");
                      });
                    var watchData=scope.$watch(function(){return scope.data},function(newVal,oldVal){
                        if(newVal!=oldVal){
                            if(scope.data && scope.data.reportIndex){
                                getReportIndex();
                                getDate.get(defaultParams,$rootScope.selectedDateFull,attrs);
                                setOptions(defaultParams);
                            }else {
                                setOptions(scope.data);
                            }
                        }
                    });
                    
                    function getSize() {
                        ndParent = element.parent()[0];
                        chartWidth = dom.clientWidth;
                        chartHeight = dom.clientHeight;
                        dom.style.width = 0;
                        dom.style.height = 0;
                        parentWidth = ndParent.clientWidth;
                        parentHeight = ndParent.clientHeight;
                        if (parentWidth > 1024) {
                            parentWidth = null;
                        }
                        currentWidth = parseInt(attrs.width) || parentWidth || chartWidth || 200;
                        currentHeight = parseInt(attrs.height) || parentHeight || chartHeight || 200;
                        dom.style.width = currentWidth + 'px';
                        dom.style.height = currentHeight + 'px';

                        if (currentWidth == chartWidth && currentHeight == chartHeight || !canResize) {
                            return false;
                        }
                        return true;
                    }

                    scope.$on('$destroy',function () {
                        watchData();
                    });
                }
            }
        })
        .directive('helloWorld', function() { 
            return { 
            restrict: 'E', 
            template: '<div>Hi 我是林炳文~~~</div>', 
            replace: true 
            }; 
           })