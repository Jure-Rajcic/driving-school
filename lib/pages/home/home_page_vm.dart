import 'package:autoskola/mvvm/app_routes.dart';
import 'package:autoskola/mvvm/view_model.abs.dart';
import 'package:rxdart/subjects.dart';

class HomePageState {
  final int carouselPageIndex;

  HomePageState({this.carouselPageIndex = 0});

  HomePageState copyWith({int? carouselPageIndex}) {
    return HomePageState(carouselPageIndex: carouselPageIndex ?? this.carouselPageIndex);
  }
}

class HomePageViewModel extends ViewModel {
  final _stateSubject = BehaviorSubject<HomePageState>.seeded(HomePageState());
  Stream<HomePageState> get state => _stateSubject;

  final _routesSubject = PublishSubject<AppRouteSpec>();
  Stream<AppRouteSpec> get routes => _routesSubject;

  void onPageChanged(newCarouselPageIndex) {
    _updateState(newCarouselPageIndex);
  }

  void secondPageButtonTapped() {
    _routesSubject.add(
      AppRouteSpec(
        name: '/second',
        arguments: {
          'count': _stateSubject.value.carouselPageIndex,
        },
      ),
    );
  }

  void _updateState(int newCarouselPageIndex) {
    final state = _stateSubject.value;
    final newState = state.copyWith(carouselPageIndex: newCarouselPageIndex);
    _stateSubject.add(newState);
  }

  @override
  void dispose() {
    _stateSubject.close();
    _routesSubject.close();
  }
}
