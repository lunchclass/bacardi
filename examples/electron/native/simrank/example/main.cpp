#include <iostream>
#include <string>

#include "../simrank.hpp"

int main() {
	SimRank<std::string> example(5, 0.8);

	example.add_edge("Univ", "ProfA");
	example.add_edge("Univ", "ProfB");
	example.add_edge("ProfA", "StudentA");
	example.add_edge("StudentA", "Univ");
	example.add_edge("ProfB", "StudentB");
	example.add_edge("StudentB", "ProfB");

	example.calculate_simrank();

	for (std::string a : example.nodes()) {
		for (std::string b : example.nodes()) {
			if (a >= b) { continue; }
			double s = example.similarity(a, b);
			if (s > 0) {
				std::cout << "similarity(" << a << ", " << b << ") = " << s << std::endl;
			}
		}
	}

	return 0;
}
