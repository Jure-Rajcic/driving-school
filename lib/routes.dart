
import 'package:autoskola/pages/home/home_page.dart';
import 'package:autoskola/pages/home/home_page_vm.dart';
import 'package:autoskola/pages/second/second_page.dart';
import 'package:autoskola/pages/second/second_page_vm.dart';
import 'package:autoskola/pages/third/third_page.dart';
import 'package:autoskola/pages/third/third_page_vm.dart';
import 'package:flutter/material.dart';

class AppRouter {
  Route<dynamic>? route(RouteSettings settings) {
    final arguments = settings.arguments as Map<String, dynamic>? ?? {};

    switch (settings.name) {
      case '/':
        return MaterialPageRoute(
          settings: settings,
          builder: (_) => HomePage(viewModel: HomePageViewModel()),
        );
      case '/second':
        final count = arguments['count'] as int?;

        if (count == null) {
          throw Exception('Route ${settings.name} requires a count');
        }

        return MaterialPageRoute(
          settings: settings,
          builder: (_) => SecondPage(
            viewModel: SecondPageViewModel(count: count),
          ),
        );
      case '/third':
        return MaterialPageRoute(
          settings: settings,
          builder: (_) => ThirdPage(viewModel: ThirdPageViewModel()),
        );
      default:
        throw Exception('Route ${settings.name} not implemented');
    }
  }
}
