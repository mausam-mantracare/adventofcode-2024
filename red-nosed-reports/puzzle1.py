import sys

def find_safe(reports):
    safe_count = 0
    for report in reports:
        
        safe = True
        first = report[0]
        second = report[1]
        increasing = first < second

        for i in range(1, len(report)):
            diff = report[i] - report[i-1]

            if abs(diff) < 1 or abs(diff) > 3:
                safe = False
                break

            if (increasing and diff < 0) or (not increasing and diff > 0):
                safe = False
                break
        if safe:
            safe_count += 1
    return safe_count

if __name__ == "__main__":

    input_file = open("input.txt", "r")
    reports = [list(map(int, line.split())) for line in input_file]

    safe_count = find_safe(reports)
    print(safe_count)

