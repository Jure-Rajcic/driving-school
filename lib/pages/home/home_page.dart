import 'package:autoskola/mvvm/view.abs.dart';
import 'package:autoskola/pages/home/home_page_vm.dart';
import 'package:autoskola/pages/home/widgets/CarouselComponent.dart';
import 'package:autoskola/pages/home/widgets/medical_examination/medical_examination.dart';
import 'package:autoskola/pages/home/widgets/medical_examination/medical_examination_vm.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart' hide View;

class HomePage extends View<HomePageViewModel> {
  HomePage({required HomePageViewModel viewModel, Key? key})
      : super.model(viewModel, key: key);

  @override
  _HomePageState createState() => _HomePageState(viewModel);

  final List<Map<String, Widget>> _components = [
    {
      'carouselComponent': const CarouselComponent(
        asset: 'assets/medical_examination.svg',
        title: 'Medical Examination',
      ),
      'viewComponent': MedicalExamination(
        viewModel: MedicalExaminationViewModel(),
      ),
    },
    {
      'carouselComponent': const CarouselComponent(
        asset: 'assets/psycho_test.svg',
        title: 'Psycho Test',
      ),
      'viewComponent': Text('Second view component'),
    }
  ];

  List<Widget> get carouselComponents {
    return _components.map((e) => e['carouselComponent']!).toList();
  }

  List<Widget> get viewComponents {
    return _components.map((e) => e['viewComponent']!).toList();
  }
}

class _HomePageState extends ViewState<HomePage, HomePageViewModel> {
  _HomePageState(HomePageViewModel viewModel) : super(viewModel);

  @override
  void initState() {
    super.initState();
    listenToRoutesSpecs(viewModel.routes);
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<HomePageState>(
      stream: viewModel.state,
      builder: (context, snapshot) {
        if (!snapshot.hasData) return Container();

        final state = snapshot.data!;

        return Scaffold(
          backgroundColor: Theme.of(context).colorScheme.background,
          appBar: AppBar(
            title: const Text('bla bla'),
          ),
          body: SafeArea(
            minimum: const EdgeInsets.symmetric(vertical: 20),
            child: Column(
              children: [
                CarouselSlider(
                  items: widget.carouselComponents,
                  options: CarouselOptions(
                    viewportFraction: 0.6,
                    aspectRatio: 1 / 0.6,
                    initialPage: 0,
                    enlargeCenterPage: true,
                    enableInfiniteScroll: false,
                    onPageChanged: (index, _) => viewModel.onPageChanged(index),
                  ),
                ),
                const SizedBox(height: 20),
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.symmetric(horizontal: 20),
                    width: double.infinity,
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Scrollbar(
                      child: SingleChildScrollView(
                        child: widget.viewComponents[state.carouselPageIndex],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
